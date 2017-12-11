#!/usr/bin/env node

/**
 * Set the Node Environment
 *   @doc The default is "development".
 *   @doc This is set to "production" by me in the PM2 commands in the deployment script deploy-prod.ubuntu.sh (production servers).
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV = 'production';

/**
 * PM2: Event listener for SIGINT: cleanup your stuff
 * @dep PM2
 * @doc http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
 * @doc This can be moved to app.js if you really have to cleanup things which are not in context right there.
 */
process.on('SIGINT', function () {
    console.log('Node.js event: process.on SIGINT');
    // Cleanup... @example db connections
    // PROCESS EXIT Ok
    process.exit(0);
});

/**
 * Node.js: float all unhandled Promises
 *   @doc http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
 *   @doc http://stackoverflow.com/questions/28709666/how-do-i-handle-exceptions-globally-with-native-promises-in-io-js-node-js
 */
process.on('unhandledRejection', function (reason, p) {
    console.log('Node.js event: process.on unhandledRejection ', reason, p); // log all your errors, "floating" them.
    throw reason; // OPTIONAL in case you want to treat these as errors
});

/**
 * NPM Module dependencies.
 *     var name = require('module-name');
 */

/*
 * Bluebird Promises
 */
/*
 *   @doc Bluebird
 */
const Promise = require('bluebird');
Promise.config({
    warnings: true,
    longStackTraces: true,
    monitoring: true
});

/**
 * MY Module dependencies.
 *     var name = require('{path}/file.js');
 */

/**
 * Debug
 */
console.log('environment:');
console.log(`  process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`  process.cwd():        ${process.cwd()}`);
console.log(`  __dirname:            ${__dirname}`);
console.log(`  __filename:           ${__filename}`);

/**
 * Constants.
 * @private
 * @doc const NAME = {declaration};
 */
const TIMER_INTERVAL = 1000;
const TIMER_TOTAL_DURATION = 15000;


/**
 ** TIMER
 */
console.log('Reached: section TIMER');

let nStaticTimerCounter = 0;
let objTimer = setInterval(() => {
    nStaticTimerCounter += TIMER_INTERVAL;
    console.log(`  timer @ ${nStaticTimerCounter}ms`);
}, TIMER_INTERVAL);
setTimeout(() => {
    console.log(' stopping the interval timer');
    clearInterval(objTimer);
}, TIMER_TOTAL_DURATION);

/**
 ** MAIN
 */
console.log('Reached: section MAIN');

function doubleAfterSeconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x * 2);
        }, x * 1000);
    });
}

function usingCoroutineYield() {
    Promise.coroutine(function* () {
        console.log('usingCoroutineYield(): begin');
        let objResponse;

        objResponse = yield doubleAfterSeconds(2);
        console.log('usingCoroutineYield() CY#1 | 2s | yielded objResponse: ', objResponse);

        objResponse = yield doubleAfterSeconds(6);
        console.log('usingCoroutineYield() CY#2 | 6s | yielded objResponse: ', objResponse);

        objResponse = yield Promise.resolve(100);
        console.log('usingCoroutineYield() CY#3 | no delay | yields objResponse: ', objResponse);

        console.log('usingCoroutineYield(): end');
    })();
}

function usingAsyncAwait() {
    (async function () {
        console.log('usingAsyncAwait(): begin');

        let objResponse;

        objResponse = await doubleAfterSeconds(4);
        console.log('usingAsyncAwait() AA#1 | 4s | awaited objResponse: ', objResponse);

        objResponse = await doubleAfterSeconds(8);
        console.log('usingAsyncAwait() AA#2| 8s | awaited objResponse: ', objResponse);

        objResponse = await 200;
        console.log('usingAsyncAwait() AA#3 | no delay | awaited objResponse: ', objResponse);

        console.log('usingAsyncAwait(): end');
    })();
}

usingCoroutineYield();
usingAsyncAwait();

/**
 ** END
 */
console.log('Reached: section END');
