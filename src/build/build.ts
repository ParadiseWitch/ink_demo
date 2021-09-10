import path from "path";
import fs from "fs";

import { envs } from "../config"
import { exec } from "../utils"
import { drive, toolsDir } from "../config"
import { subProcessOut } from "../subProcessOut"

export class Build {
  name: string
  isDev: boolean
  cmd: string
  targetDir: string
  buildModules: string[]
  constructor(envName: string) {
    this.name = envName;
    this.isDev = envs[envName].isDev
    this.cmd = envs[envName].cmd
    this.targetDir = envs[envName].targetDir
    this.buildModules = []
  }


  setBuildModules(modules: string[]) {
    this.buildModules = modules;
  }

  isDir(filePath) {
    return fs.lstatSync(filePath).isDirectory();
  }

  // 获取打包好的路径
  getBuildDir(moduleName: string): string {
    const folderPath = `${toolsDir}\\${moduleName}\\dist`;
    const dirs = fs
      .readdirSync(folderPath)
      .map((itemName) => {
        return path.join(folderPath, itemName);
      })
      .filter(this.isDir)
      .filter((path) => /.*\d{14}/.test(path))

    if (!dirs.length) {
      console.error(`\x1b[40m \x1b[31m ${moduleName}下无打包文件夹 \x1b[0m`);
      throw new Error(`\x1b[40m \x1b[31m ${moduleName}下无打包文件夹 \x1b[0m`);
    }
    const timestamps: number[] = dirs.map<number>(
      (path: string): number => parseInt(path.replace(/.*gei-tool-.*-(?=\d+$)/, ""))
    );

    const maxTimestamp = Math.max(...timestamps);
    if (this.name.startsWith("production")) {
      return path.join(folderPath, `${moduleName}-${maxTimestamp}`);
    }
    return path.join(folderPath, moduleName);
  }

  // 删除旧文件夹  过时
  async removeOldDir() {
    for (let i = 0; i < this.buildModules.length; i++) {
      await exec(`rmdir /s/q ${this.targetDir}\\${this.buildModules[i]}`)
    }
  }

  // 运行打包命令
  async runBuildCommand(): Promise<string> {
    let out: string[] = [];
    for (let i = 0; i < this.buildModules.length; i++) {
      const command = `${drive} && cd ${toolsDir}\\${this.buildModules[i]} && ${this.cmd}`
      out.push.apply(await subProcessOut(command))
    }
    return out.join("\n");
  }

  // 复制到目标目录
  async dup2targetDir(): Promise<string> {
    for (let i = 0; i < this.buildModules.length; i++) {
      const buildDir = this.getBuildDir(this.buildModules[i]);
      const command = `echo d | xcopy ${toolsDir}\\${this.buildModules[i]}\\dist\\${this.buildModules[i]} ${this.targetDir}\\${this.buildModules[i]} /s/y`
      return await subProcessOut(command)
    }
  }
}