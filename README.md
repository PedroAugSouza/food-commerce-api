## Descrição

- Este projeto é uma api para venda de fast foods, onde o usuário cria uma conta, adiciona a refeição dele no carrinho e finaliza o pedido, é possível também o usuário admin cadastrar, editar e excluir produtos que estão à venda.
- Nele eu utilizo o framework NestJs e a arquitetura limpa com testes unitários
- De banco de dados utilizo o MySql e a ORM Prisma para facilitar a interação com o banco de dados

## Instalação

```bash
# clonar o repositório
$ git clone https://github.com/PedroAugSouza/food-commerce-api.git

# instalar dependências
$ npm install
```

## Executar o app

```bash
# desenvolvimento
$ npm run start:dev

# produção
$ npm run start:prod
```

## Test

```bash
# testes unitários
$ npm test
```

## Endpoints

### Autenticação

- `POST /register`: Registra um usuário
  - Body:
    ```json
    {
      "email": "String",
      "username": "String",
      "password": "String",
      "role": "ADMIN | COMMOM"
    }
    ```
- `POST /login`: Autentica um usuário existente
  - Body:
    ```json
    {
      "email": "String",
      "password": "String"
    }
    ```

### Produtos

- `POST /product`: Cria um produto novo
  - Body:
    ```json
    {
      "name": "String",
      "description": "String",
      "category": "FOOD | DRINK | COMBO",
      "image": "File",
      "price": "Number",
      "amountAvailable": "Number"
    }
    ```
- `GET /products`: Lista todos os produtos disponíveis
  - Parâmetros:
    - `category`: Filtra produtos por categoria (ex: `food`, `drink` ou `combo`)
    - `price`: Filtra produtos do mais barato ao mais caro, e vice-versa (ex: `asc` ou `desc`)
- `GET /product/{uuid}`: Obtém detalhes de um produto específico
- `PATCH /product/{uuid}`: Atualiza os dados de um produto específico

### Carrinho

- `GET /cart/{userUuid}`: Visualiza o carrinho atual
- `POST /cart`: Adiciona um produto ao carrinho
- `PATCH /cart/update`: Atualiza a quantidade de um produto no carrinho
  - Body:
    ```json
    {
      "amountProducts": "Number",
      "productUuid": "String",
      "cartUuid": "String"
    }
    ```
- `DELETE /cart/remove`: Remove um produto do carrinho
  - Body:
    ```json
    {
      "productUuid": "String",
      "cartUuid": "String"
    }
    ```

### Notas:

- Todos os endpoints, exceto registro e login, requerem autenticação.
- O app estará rodando na porta `:8000`
