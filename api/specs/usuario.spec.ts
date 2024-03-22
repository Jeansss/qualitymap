import { expect, test, Page } from '@playwright/test';
import apiScenarios from '../../data/api-scenarios.json';
import { PostUsuarioRequestBuilder } from 'api/request_builders/usuario/post-usuario.builder';
import { UsuarioServiceClient } from 'api/services/usuario/usuario.service';
import { PostUsuarioResponseBuilder } from 'api/response_builders/usuario/post-user-response.builder';
import { faker } from '@faker-js/faker';
import { GetUsuarioResponseBuilder } from 'api/response_builders/usuario/get-user-response.builder';
import { PutUsuarioResponseBuilder } from 'api/response_builders/usuario/put-user-response.builder';
import { DeleteUsuarioResponseBuilder } from 'api/response_builders/usuario/delete-user-response.builder';

const apiData: JSONValue = apiScenarios;

apiData.post_user.forEach((data: JSONValue) => {
  test(`POST /usuarios - ${data.scenario}`, async () => {
    const email = data.scenario === 'success_response' ? `usuario${Math.floor(Math.random() * 7000)}@test.com` : 'invalid_email';

    const requestBody = new PostUsuarioRequestBuilder()
      .setNome(faker.person.firstName())
      .setEmail(email)
      .setPassword(data.password)
      .setAdministrador(data.administrador)
      .build();

    const responsePostUser = await new UsuarioServiceClient().postUser(requestBody);
    const expectedResponseJson = new PostUsuarioResponseBuilder().selectResponseBody(data.scenario);

    expect.soft(responsePostUser).toHaveStatusCode(data.status_code);
    expect.soft(responsePostUser).toHaveJSON(expectedResponseJson);
  });
});

apiData.put_user.forEach((data: JSONValue) => {
  test(`PUT /usuarios/{id} - ${data.scenario}`, async () => {
    let email = `usuario${Math.floor(Math.random() * 7000)}@test.com`;
    let requestBody = new PostUsuarioRequestBuilder()
      .setNome(faker.person.firstName())
      .setEmail(email)
      .setPassword(data.password)
      .setAdministrador(data.administrador)
      .build();
    const responsePostUser = await new UsuarioServiceClient().postUser(requestBody);
    const responsePostUserJson = await responsePostUser.json();
    const userId = responsePostUserJson._id;

    requestBody.nome = faker.person.firstName();
    if (data.scenario === 'error_response') {
      email = `usuario${Math.floor(Math.random() * 7000)}@test.com`;
      requestBody = new PostUsuarioRequestBuilder()
        .setNome(faker.person.firstName())
        .setEmail(email)
        .setPassword(data.password)
        .setAdministrador(data.administrador)
        .build();
      await new UsuarioServiceClient().postUser(requestBody);
    }
  
    const responsePutUserId = await new UsuarioServiceClient().putUser(userId, requestBody);
    const expectedResponseJson = new PutUsuarioResponseBuilder().selectResponseBody(data.scenario);

    expect.soft(responsePutUserId).toHaveStatusCode(data.status_code);
    expect.soft(responsePutUserId).toHaveJSON(expectedResponseJson);
  });
});

apiData.get_user.forEach((data: JSONValue) => {
  test(`GET /usuarios/{id} - ${data.scenario}`, async () => {
    const email = `usuario${Math.floor(Math.random() * 7000)}@test.com`;

    const requestBody = new PostUsuarioRequestBuilder()
      .setNome(faker.person.firstName())
      .setEmail(email)
      .setPassword(data.password)
      .setAdministrador(data.administrador)
      .build();
    const responsePostUser = await new UsuarioServiceClient().postUser(requestBody);
    const responsePostUserJson = await responsePostUser.json();
    const userId = data.scenario === 'success_response' ? responsePostUserJson._id : '0';

    const responseGetUserId = await new UsuarioServiceClient().getUser(userId);
    const expectedResponseJson = new GetUsuarioResponseBuilder().selectResponseBody(data.scenario, requestBody);

    expect.soft(responseGetUserId).toHaveStatusCode(data.status_code);
    expect.soft(responseGetUserId).toHaveJSON(expectedResponseJson);
  });
});

apiData.delete_user.forEach((data: JSONValue) => {
  test(`DELETE /usuarios/{id} - ${data.scenario}`, async () => {
    const email = `usuario${Math.floor(Math.random() * 7000)}@test.com`;

    const requestBody = new PostUsuarioRequestBuilder()
      .setNome(faker.person.firstName())
      .setEmail(email)
      .setPassword(data.password)
      .setAdministrador(data.administrador)
      .build();
    const responsePostUser = await new UsuarioServiceClient().postUser(requestBody);
    const responsePostUserJson = await responsePostUser.json();
    const userId = data.scenario === 'success_response' ? responsePostUserJson._id : '0';

    const responseDeleteUserId = await new UsuarioServiceClient().deleteUser(userId);
    const expectedResponseJson = new DeleteUsuarioResponseBuilder().selectResponseBody(data.scenario);

    expect.soft(responseDeleteUserId).toHaveStatusCode(data.status_code);
    expect.soft(responseDeleteUserId).toHaveJSON(expectedResponseJson);

    if (data.scenario === 'success_response') {
      const responseGetUserId = await new UsuarioServiceClient().getUser(userId);
      const expectedGetResponseJson = new GetUsuarioResponseBuilder().selectResponseBody('error_response', requestBody);
      expect.soft(responseGetUserId).toHaveJSON(expectedGetResponseJson);
    }
  });
});
