import { envs } from "../config"
import { exec } from "../utils"
import { drive, toolsDir } from "../config"
import { subProcessOut } from "../subProcessOut"

export class Build {
  isDev: boolean
  cmd: string
  targetDir: string
  buildModules: string[]
  constructor(envName: string) {
    this.isDev = envs[envName].isDev
    this.cmd = envs[envName].cmd
    this.targetDir = envs[envName].targetDir
    this.buildModules = []
  }


  setBuildModules(modules: string[]) {
    this.buildModules = modules;
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
      const command = `echo d | xcopy ${toolsDir}\\${this.buildModules[i]}\\dist\\${this.buildModules[i]} ${this.targetDir}\\${this.buildModules[i]} /s/y`
      return await subProcessOut(command)
    }
  }
}