import cluster from 'cluster'
import { cpus } from 'node:os'
import { pid } from 'node:process'

void (async () => {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)

    const numOfCpus = cpus().length
    for (let i = 0; i < numOfCpus; i++) {
      cluster.fork()
    }
  } else {
    await import('./index')
    console.log(`Worker ${process.pid} started`)
  }
})()
