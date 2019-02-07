const { Timer } = require('../../utils');

const EXAMPLE_TASK_INTERVAL = 1000;

const timer = new Timer();

async function run() {
    try {
        console.debug('example task started at ', new Date(timer.startTimer()));
    } catch (error) {
        console.error(error);
    } finally {
        console.debug('example task ended at ', parseFloat(timer.endTimer() / 1000 / 60), ' min')
    }
}

if ('test' !== process.env.NODE_ENV) {
    let runPromise = run();
    setInterval(() => {
        runPromise = runPromise.then(() => run() )
    }, EXAMPLE_TASK_INTERVAL);
}

module.exports = run;
