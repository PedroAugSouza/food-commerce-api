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
- `POST /login`: Autentica um usuário existente

### Produtos

- `GET /products`: Lista todos os produtos disponíveis
  - Parâmetros:
    - `category`: Filtra produtos por categoria (ex: `food`, `drink` ou `combo`)
    - `price`: Filtra produtos do mais barato ao mais caro, e vice-versa (ex: `asc` ou `desc`)
- `GET /products/{uuid}`: Obtém detalhes de um produto específico
- `PATCH /products/{uuid}`: Atualiza os dados de um produto específico

### Carrinho

- `GET /cart/{cartUuid}`: Visualiza o carrinho atual
- `POST /cart`: Adiciona um produto ao carrinho
- `PATCH /cart/update`: Atualiza a quantidade de um produto no carrinho
- `DELETE /cart/remove/{productUuid}`: Remove um produto do carrinho

### Notas:

- Todos os endpoints, exceto registro e login, requerem autenticação.
- O app estará rodando na porta `:8000`
