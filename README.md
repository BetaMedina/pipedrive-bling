
### Escolhas de desenvolvimento:

- Utilização de clean architecture
- DDD
- Typescript
- Axios
- JsToXml
- express
- Docker (database)
- mongodb Lib
- jest



### Features previstas:

- Cadastro de webhook via api
- Filtros via query params
- Testes de integração
- Registros de logs no mongo

#### Importante
- Cadastre-se no [bling](https://suporte.ideris.com.br/portal/pt/kb/articles/como-obter-token-bling) e adquira seu apiToken
- Cadastre-se no [pipedrive](https://pipedrive.readme.io/docs/how-to-find-the-api-token") e adquira seu apiToken
- Registre [webhook](https://pipedrive.readme.io/docs/guide-for-webhooks) com o endpoint "/webhook" dentro da plataforma do pipedrive, imporante que seu event action seja **added** e seu event object seja **deal** 
- PR'S são sempre bem vindos
- O banco utilizado para testes em prod foi o Atlas, porem deixei um composer para que possa utilizar o mesmo em desenvolvimento
- Evite Middle Man


# Instalação
``
docker-compose up
``
<br><br>
``
npm install
``<br><br>
``
npm run dev
``
<br>


### Testes:
- Run `npm run test` para testes unitarios 
- Run `npm run test:ci` para o coverage dos dados


## Guia rápido de sobrevivência

Urls cadastradas:
|    Comando     |Ação                           
|----------------|-------------------------------
|/webhook | `Url cujo a qual sera registrado dentro do webhook dentro do pipedrive`|            
|/orders  | `Url que deve retornar os dados dos pedidos registrados dentro do sistema`|

<br><br>
Retornos da api:
|    Comando     |Ação                           
|----------------|-------------------------------
|400 | `Bad request`|
|500 | `Server error`|
|204  | `Empty response`|
|200  | `Success`|





