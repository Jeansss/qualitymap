# quality-map-challenge

## Cenários:

**Scenario:** Consumer registration

**Given** the consumer goes to the registration page 

**When** the consumer registers on the demoecommerce

**Then** the consumer should be registered successfully



**Scenario Outline:** Consumer tries registration with invalid form

**Given** the consumer goes to the registration page  

**When** the consumer tries to continue the registration with "<case>" "<field>"  

**Then** the error message should be presented as "<message>"

**Examples:**  
| field            | case    |
|------------------|---------|
| first_name       | blank   |
| last_name        | blank   |
| email            | blank   |
| email            | invalid |
| password         | blank   |
| password         | invalid |
| confirm_password | blank   |
| confirm_password | invalid |

## Overview

O projeto utiliza estruturas visando alta manutenção, performance e reutilização como:

- Page Objects Model
- Estrutura de controle de dados centralizada (factory)
- Paralelização da execução (playwright traz isso out-of-the-box)
- Múltiplos browsers (playwright traz isso out-of-the-box)
- e2e tests -> simulação de usuário
- api testes -> testes na camada de api (back end)
- Validação de fluxos corretos e exceções (Happy and Sad)

Além disso os testes de api e front estão separados em diferentes pastas, e2e para os de front e api para os de back.

## Requisitos

- Nodejs LTS
- VSCode

## Comandos

### Instalação de dependências

```sh
npm install
```

### Setup do playwright

```sh
npx playwright install
npx playwright install-deps
```

#### Por defalut serão executados os testes e2e com o comando abaixo:

```sh
npx playwright test --project=chromium
```

#### Para os testes de api necessário acrescentar o API=true no comando:

No windows necessário utilizar o terminal do git para aceitar essa variável API=true:

```sh
API=true npx playwright test --project=chromium
```

#### É possível executar os testes em resolução mobile com o comando abaixo:


```sh
npx playwright test --project=mobileChrome
```

### Executar os testes com docker

Rodar testes com docker

Necessário executar os comandos abaixo:

Buildar a imagem:

```sh
docker build -t quality-map-im .
```

Subir o container

```sh
docker run -d --name quality-container quality-map-im
```

Acessar o terminal do container para executar os testes em ambiente isolada:

```sh
docker exec -it quality-container bash
```

Após isso é possível inserir normalmente os comando de execução:

```sh
API=true npx playwright test --project=chromium
```

```sh
npx playwright test --project=chromium
```
