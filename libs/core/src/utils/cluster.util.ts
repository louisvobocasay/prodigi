import Bull from 'bull';
const cluster = require('cluster');
const os = require('os');

export class ClusterUtil {
  static numCPUs = os.cpus().length;

  static clusterize(callback: Function) {
    if (cluster.isPrimary || cluster.isMaster) {
      console.log(`Master server (${process.pid}) is running `);
      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork(
          Object.assign({}, process.env, {
            RUN_MIGRATION: i === 0,
            WORKER_NAME: i + 1,
            CPULENTH: this.numCPUs,
          }),
        );
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      console.log(`Worker server (${process.pid}) is running `);
      callback();
    }
  }

  static queueClusterize(
    callback: Bull.ProcessCallbackFunction<any>,
    queue: Bull.Queue,
  ) {
    if (cluster.isMaster) {
      console.log(`Master server (${process.pid}) is running`);
      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      console.log(`Worker server (${process.pid}) is running `);
      queue.process(callback);
    }
  }
}
