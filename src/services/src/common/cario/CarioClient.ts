import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { validate as uuidValidate } from "uuid";
import { IConsignmentStatus, IConsignment, ICreateEvent } from "./generated/carioTypes";
import axiosRetry from "axios-retry";
import { TelemetryClient } from "applicationinsights";

axiosRetry(axios, {
  retries: 5,
  retryCondition: (error: AxiosError<any>) => {
    return error.response.status === 429 || error.response.status >= 500;
  },
});

export const CarioAPIURL = "https://integrate.cario.com.au/";

export interface ICarioClient {
  GetOrQueryConsignment(connoteNumberOrGuid: string): Promise<IConsignmentStatus>;
  GetConsignmentByUID(consignmentGuid: string): Promise<IConsignment>;
  GetConsignment(consignmentGuid: string): Promise<IConsignmentStatus>;
  QueryConsignment(connoteId: string): Promise<IConsignmentStatus>;
  CreateEvent(event: ICreateEvent): Promise<void>;
}

export class CarioClient implements ICarioClient {
  private config: AxiosRequestConfig;
  constructor(private readonly carioUrl: string, token: string, private readonly logger: TelemetryClient) {
    this.config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  public async GetOrQueryConsignment(connoteNumberOrGuid: string): Promise<IConsignmentStatus> {
    if (uuidValidate(connoteNumberOrGuid)) {
      return await this.GetConsignment(connoteNumberOrGuid);
    }
    return await this.QueryConsignment(connoteNumberOrGuid);
  }

  public async GetConsignmentByUID(consignmentGuid: string): Promise<IConsignment> {
    try {
      const response = await axios.get(`${this.carioUrl}/api/Consignment/GetByUID/${consignmentGuid}`, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        return undefined;
      }
      this.logger.trackException({
        exception: error,
        properties: {
          consignment: consignmentGuid,
        },
      });
      throw new Error(error.response.statusText);
    }
  }

  public async GetConsignment(consignmentGuid: string): Promise<IConsignmentStatus> {
    try {
      const response = await axios.get(`${this.carioUrl}/api/ConsignmentStatus/Get/${consignmentGuid}`, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        return undefined;
      }
      this.logger.trackException({
        exception: error,
        properties: {
          consignment: consignmentGuid,
        },
      });
      throw new Error(error.response.statusText);
    }
  }

  public async QueryConsignment(connoteId: string): Promise<IConsignmentStatus> {
    try {
      const response = await axios.get(`${this.carioUrl}/api/ConsignmentStatus/Query/${connoteId}`, this.config);
      if (Array.isArray(response.data)) {
        return response.data[0];
      }
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        return undefined;
      }
      this.logger.trackException({
        exception: error,
        properties: {
          consignment: connoteId,
        },
      });
      throw new Error(error.response.statusText);
    }
  }

  async CreateEvent(event: ICreateEvent): Promise<void> {
    try {
      await axios.post(`${this.carioUrl}/api/ConsignmentStatus/CreateEvent`, event, this.config);
    } catch (error) {
      console.log(error);
      this.logger.trackException({
        exception: error,
        properties: {
          event: event,
        },
      });
      throw new Error(error.response.statusText);
    }
  }
}
