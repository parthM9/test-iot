import { TelemetryClient } from "applicationinsights";
import { ICarioClient } from "../cario/CarioClient";
import { CARIO_CREATE_EVENT_NEAR_DEL, ICreateEvent } from "../cario/generated/carioTypes";
import { IGeoCalculator } from "../geocalc/GeoCalculator";
import { IPersistedConsignment } from "../repositories/consignment/consignment";
import { IConsignmentRepository } from "../repositories/consignment/ConsignmentRepository";
import { IDeviceLocation } from "../repositories/location/types";

export interface IAlerter {
  alertForDeviceIfNeeded(deviceId: string, location: IDeviceLocation, thresholdInMeters: number): Promise<void>;
}

export class Alerter implements IAlerter {
  constructor(
    private readonly carioClient: ICarioClient,
    private readonly consignmentRepo: IConsignmentRepository,
    private readonly geoCalulator: IGeoCalculator,
    private readonly logger?: TelemetryClient,
  ) {}

  async alertForDeviceIfNeeded(deviceId: string, location: IDeviceLocation, thresholdInMeters: number): Promise<void> {
    const consignmentsForDevice = await this.consignmentRepo.getConsignmentsOutForDeliveryWithDevice(deviceId);
    if (!consignmentsForDevice || consignmentsForDevice.length === 0) {
      return;
    }

    const consignment = consignmentsForDevice[0];

    if (consignmentsForDevice.length > 1) {
      this.logError(
        `We received multiple consignments for device: ${deviceId}, using latest ${consignment.connoteNumber}: ${consignmentsForDevice
          .map((c) => c.connoteNumber)
          .join(", ")}`,
      );
    }

    if (!consignment.deliveryCoordinates) {
      this.logError(`Consignment ${consignment.connoteNumber} has no delivery coordinates.`);
      return;
    }

    if (consignment.alertStatus) {
      this.logError(`Consignment ${consignment.connoteNumber} has already been alerted.`);
      return;
    }

    const distance = this.geoCalulator.calculateDistance(
      { lat: location.location.lat, long: location.location.long },
      consignment.deliveryCoordinates,
    );

    console.log(`Consignemnt ${consignment.connoteNumber} is ${distance}m from destination.`);

    if (distance !== -1 && distance < thresholdInMeters) {
      const alertTime = new Date().toISOString();
      const event: ICreateEvent = {
        consignmentID: consignment.id,
        eventTime: alertTime,
        eventType: CARIO_CREATE_EVENT_NEAR_DEL,
        latitude: location.location.lat,
        longitude: location.location.long,
        comments: `Consignment ${consignment.connoteNumber} is less than ${thresholdInMeters} meters from its destination.`,
      };
      await this.carioClient.CreateEvent(event);
      consignment.alertStatus = {
        alertSentAt: alertTime,
        distanceToDestination: distance,
      };
      this.logEvent("AlertSent", consignment);
      await this.consignmentRepo.upsert(consignment);
      this.logEvent("ConsignmentUpdatedWithAlertStatus", consignment);
    }
  }

  private logError(msg: string) {
    console.log(msg);
    this.logger?.trackException({ exception: new Error(msg) });
  }

  private logEvent(eventName: string, consignment: IPersistedConsignment) {
    console.log(new Date().toISOString(), eventName, consignment.connoteNumber);
    this.logger?.trackEvent({
      name: eventName,
      properties: {
        consignmentId: consignment.id,
        connoteNumber: consignment.connoteNumber,
        alertStatus: consignment.alertStatus,
      },
    });
  }
}
