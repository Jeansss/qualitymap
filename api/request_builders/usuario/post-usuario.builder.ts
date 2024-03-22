export class PostUsuarioRequestBuilder {
  private body: JSONValue = {};

  setNome(nome: string): this {
    this.body.nome = nome;
    return this;
  }

  setEmail(email: string): this {
    this.body.email = email;
    return this;
  }

  setPassword(password: string): this {
    this.body.password = password;
    return this;
  }

  setAdministrador(administrador: string): this {
    this.body.administrador = administrador;
    return this;
  }

  build(): JSONValue {
    return this.body;
  }
}
