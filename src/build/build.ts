import { envs } from "../config"
import { exec } from "../utils"
import { drive, toolsDir } from "../config"

class Build {
  isDev: boolean
  cmd: any
  targetDir: string
  buildModules: string[]
  constructor(envName: string) {
    this.isDev = envs[envName].isDev
    this.cmd = envs[envName].cmd
    this.targetDir = envs[envName].cmd
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
  async runBuildCommand() {
    for (let i = 0; i < this.buildModules.length; i++) {
      await exec(`${drive} & cd ${toolsDir}\\${this.buildModules[i]} & npm run ${this.cmd}`)
    }
  }

  // 复制到目标目录
  async dup2targetDir() {
    for (let i = 0; i < this.buildModules.length; i++) {
      const str = `echo d | xcopy ${toolsDir}\\${this.buildModules[i]}\\dist\\${this.buildModules[i]} ${this.targetDir}\\${this.buildModules[i]} /s/y`
      await exec(str)
    }
  }
}