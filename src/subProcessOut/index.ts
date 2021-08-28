import childProcess from "child_process";


export const subProcessOut = (command): Promise<string> => {
  return new Promise((res, rej) => {
    try {
      const subProcess = childProcess.exec(command, (e, stdout, stderr) => {
        if (stderr) {
          rej(stderr)
        }
        if (e) {
          console.error(`exec error: ${e}`);
          throw new Error();
        }
        res(stdout)
      });
     
    } catch (error) {
      rej(error)
    }
  })
}

