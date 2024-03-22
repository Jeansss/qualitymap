import { APIRequestContext, request } from "@playwright/test";
import dataJson from "./../../data/api-data.json";


export class ApiRequestBase {
  baseUrl: string;
  apiContext: Promise<APIRequestContext>;

  constructor() {
    const urls = dataJson.urls as JSONValue;
    this.baseUrl = urls['serverest']
    this.apiContext = this.buildApiRequestContext();
  }

  async buildApiRequestContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: this.baseUrl,
    });
  }
}

