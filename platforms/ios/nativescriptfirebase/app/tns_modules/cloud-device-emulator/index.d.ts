/// <reference path="./interfaces.d.ts" />

declare module "cloud-device-emulator" {
	function getSeverAddress(): Promise<ICloudDeviceServerInfo>;
	var deviceEmitter: CloudDeviceEmitter;
	function refresh(deviceIdentifier: string): Promise<void>;
	function killServer(): Promise<any>;
}
