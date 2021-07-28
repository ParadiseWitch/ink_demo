
export function exec(cmd: string) {
  const child_process = require('child_process')
  return new Promise((resolve) => {
    const proc = child_process.spawn(cmd, [], {
      stdio: 'inherit',
      shell: true,
    })
    proc.on('error', (e) => {
      throw e
    })
    proc.on('exit', resolve)
  })
}

export function readln(tip: any) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(tip, (s) => {
      resolve(s)
    })
  })
}