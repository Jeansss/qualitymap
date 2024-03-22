import { expect } from '@playwright/test';
import { ResponseBuilder } from '../response-builder';

export class GetUsuarioResponseBuilder extends ResponseBuilder {

  successResponseBody(payload: JSONValue): JSONValue {
    this.body.nome = payload.nome;
    this.body.email = payload.email;
    this.body.password = payload.password;
    this.body.administrador = payload.administrador;
    this.body._id = expect.any(String);
    return this.body;
  }

  errorResponseBody(): JSONValue {
    this.body.message = 'Usuário não encontrado';
    return this.body;
  }

  selectResponseBody(scenario: string, payload: JSONValue): JSONValue {
    const builder = new GetUsuarioResponseBuilder();

    const body = {
      success_response: () => builder.successResponseBody(payload),
      error_response: () => builder.errorResponseBody(),
    };
    return body[scenario as keyof typeof body]();
  }
}
