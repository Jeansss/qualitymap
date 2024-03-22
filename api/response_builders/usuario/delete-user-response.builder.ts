import { ResponseBuilder } from '../response-builder';

export class DeleteUsuarioResponseBuilder extends ResponseBuilder {

  successResponseBody(): JSONValue {
    this.body.message = 'Registro excluído com sucesso';
    return this.body;
  }

  errorResponseBody(): JSONValue {
    this.body.message = 'Nenhum registro excluído';
    return this.body;
  }

  selectResponseBody(scenario: string): JSONValue {
    const builder = new DeleteUsuarioResponseBuilder();

    const body = {
      success_response: () => builder.successResponseBody(),
      error_response: () => builder.errorResponseBody(),
    };
    return body[scenario as keyof typeof body]();
  }
}
