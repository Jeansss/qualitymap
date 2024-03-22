import { expect } from '@playwright/test';
import { ResponseBuilder } from '../response-builder';

export class PostUsuarioResponseBuilder extends ResponseBuilder {

  successResponseBody(): JSONValue {
    this.body.message = 'Cadastro realizado com sucesso';
    this.body._id = expect.any(String);
    return this.body;
  }

  errorResponseBody(): JSONValue {
    this.body.email = 'email deve ser um email válido';
    return this.body;
  }

  selectResponseBody(scenario: string): JSONValue {
    const builder = new PostUsuarioResponseBuilder();

    const body = {
      success_response: () => builder.successResponseBody(),
      error_response: () => builder.errorResponseBody(),
    };
    return body[scenario as keyof typeof body]();
  }
}
