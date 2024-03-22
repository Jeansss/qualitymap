import { APIResponse } from "@playwright/test";
import { ApiRequestBase } from "../api-request-base";

export class UsuarioServiceClient extends ApiRequestBase {

  constructor() {
    super();
  }

  async postUser(body: JSONValue): Promise<APIResponse> {
    return (await this.apiContext).post('usuarios', {
      data: body,
    });
  }

  async putUser(id: string, body: JSONValue): Promise<APIResponse> {
    return (await this.apiContext).put(`usuarios/${id}`, {
      data: body,
    });
  }

  async getUser(id: string): Promise<APIResponse> {
    return (await this.apiContext).get(`usuarios/${id}`);
  }

  async deleteUser(id: string): Promise<APIResponse> {
    return (await this.apiContext).delete(`usuarios/${id}`);
  }
}