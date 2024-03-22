import { ResponseBuilder } from '../response-builder';

export class PutUsuarioResponseBuilder extends ResponseBuilder {

  successResponseBody(): JSONValue {
    this.body.message = 'Registro alterado com sucesso'
    return this.body;
  }

  errorResponseBody(): JSONValue {
    this.body.message = 'Este email já está sendo usado';
    return this.body;
  }

  selectResponseBody(scenario: string): JSONValue {
    const builder = new PutUsuarioResponseBuilder();

    const body = {
      success_response: () => builder.successResponseBody(),
      error_response: () => builder.errorResponseBody(),
    };
    return body[scenario as keyof typeof body]();
  }
}
