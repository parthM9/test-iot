import { ITrackedConsignment } from "../models/consignment";


/**
 * Check if the specified consignment is an IoT customer.
 * A consignment tracking device may not have a serial number. So we want to
 * show those customers as "non-iot"
 * @param consignment 
 * @returns 
 */
export const isIoTCustomer = (consignment: ITrackedConsignment) => {
  // If the consignment has tracking devices. It is an IoT customer
  const hasDevices = !!consignment.trackingDevices.length;
  // We also need to check that the devices all have serial numbers. If the
  // device doesn't have a serial number, treat as a non-IoT.
  const serialNumbers = consignment.trackingDevices
  .filter(device => device.serialNumber)
  const hasSerialNumbers = !!serialNumbers.length
  return hasDevices && hasSerialNumbers;
}