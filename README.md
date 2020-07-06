# GoBarber desenvolvido no bootcamp da Rocketseat

## O que é?

O back-end foi desenvolvido para que sirva um front-end e um mobile. Feito para que possa criar usuários e marcar agendamentos.

## Como está estruturado?

### Arquitetura

API feita seguindo o padrão REST, com 3 princípios do SOLID aplicados. Estruturado com Domain-Driven Design e seguindo o TDD para desenvolvimento.

### Banco de dados

Foram utilizados 3 bancos de dados ao todo:
- SQL com PostgreSQL
- Document NoSQL com mongoDB
- Key-Value NoSQL com Redis

**PostgreSQL**

Usado para suprir a necessidade dos dados que precisam de segurança e persistência. Foi implementado para a tabela de usuários, agendamentos e token de usuários (para reset de senha).

**MongoDB**

Usado para notificações no geral, por enquanto para envio de e-mails, contendo destinatário e corpo. São dados que não precisam de tanta segurança e a sua estrutura não tem tanta importância, com isso pode mudar com o tempo também.

**Redis**

Ainda sendo implementado como *Write back cache*, esta sendo usado para reduzir a carga no banco de dados, pois podemos armazenar  informações na memória do servidor e com isso criar cache das informações.

#### Docker

Cada banco de dados usa um docker com sua respectiva imagem. Para instalar:

**PostgreSQL**
```
  docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
**MongoDB**
```
  docker run --name mongodb -p 27071:27017 -d -t mongo
```
**Redis**
```
  docker run --name redis -p 6379:6379 -d -t redis:alpine
```

## Possui serviço externo?

O back-end possui dois serviços configurados para ambiente de produção, um de envio de e-mail e outro para armazenamento de arquivos (imagem de perfil). No envio de e-mail foi utilizado o Amazon SES e de armazenamento Amazon S3. Para utilizar é necessário criar uma conta e adicionar esses serviços, depois preencher o arquivo `.env`.

## Como baixar e rodar na máquina?

Primeiro é necessário *clonar* esse repositório. Feito isso, crie um arquivo `.env` seguindo o `.env.example`.

**.env**

As opções que necessitam escolher entre ambiente de desenvolvimento e de produção,
possuem tipagem onde estão sendo usadas.

- APP_EXPIRES: use `dev` ou qualquer outra coisa para simbolizar produção
- MAIL_PROVIDER: `ethereal` para desenvolvimento ou `ses` para produção, necessitando preenche as variáveis da `AWS`
- STORAGE_PROVIDER: `disk` para desenvolvimento ou `s3` para produção, necessitando preencher as variáveis da `AWS`

**Instalando os módulos**

Execute no terminal ` yarn add ` para instalar todos os módulos necessários.
Use `yarn dev:server` para poder executar a aplicação.
Use `yarn typeorm db:migrate` para executar as migrations.

## O que foi usado para auxílio?

- [VsCode](https://code.visualstudio.com/)
- [Insomnia](https://insomnia.rest/) to make requests
- [DBeaver](https://dbeaver.io/) visualize postgres database
- [MongoDB Compass](https://www.mongodb.com/products/compass) visualize mongoDB database
