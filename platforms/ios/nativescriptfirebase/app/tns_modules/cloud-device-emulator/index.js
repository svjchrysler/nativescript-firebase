'use strict';

const DeviceEmitter = require('./src/device-emitter');
const DeviceManager = require('./src/device-manager');
const deviceEmitterInstance = new DeviceEmitter();
const deviceManager = new DeviceManager(deviceEmitterInstance);

module.exports = {
    getSeverAddress: deviceEmitterInstance.getSeverAddress.bind(deviceEmitterInstance),
    killServer: deviceEmitterInstance.killServer.bind(deviceEmitterInstance),
    deviceEmitter: deviceEmitterInstance,
    refresh: deviceManager.refresh.bind(deviceManager)
}
