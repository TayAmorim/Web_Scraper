<h1 align="center">
   <p> 💫 Web Scraping - Mais vendidos da Amazon 💫</p>
</h1>


## Projeto

Desenvolvimento de um Sistema de Web Scraping dos produtos mais vendidos da Amazon. Os produtos são capturados e salvos com as informações de categoria, nome, id, preço e disponibilizados para serem consumidos por uma API e populados em um banco de dados. 

## O que é um Web Scraper?
Ferramenta que extrai dados automaticamente de páginas da web. Ele analisa o código HTML de um site e coleta informações específicas, como preços de produtos ou detalhes de contato. Pode ser usado para monitoramento de preços, pesquisa de mercado e outras aplicações. 

## Stack 

- [NodeJS/TypeScript](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)
- [AWS](https://docs.aws.amazon.com/pt_br/)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

## Tecnologias 

- [AWS Lambda](https://docs.aws.amazon.com/en_us/lambda/) - Utilizado para computação de forma serverless. No contexto do projeto, foi possível desenvolver e implantar funções que são ativadas em resposta a eventos. Isso permitiu uma execução sob demanda e escalabilidade automática, eliminando a necessidade de provisionar ou gerenciar servidores.

- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/) - Utilizado para a gestão da API. No projeto, desempenha um papel na exposição e gerenciamento dos endpoints, permitindo definição de rotas, métodos HTTP  e controle de acesso.

- [AWS DynamoDB](https://docs.aws.amazon.com/dynamodb/) - Utilizado como banco de dados. No projeto, o AWS DynamoDB é essencial para armazenar e gerenciar os dados coletados pelo web scraper.

- [Puppeteer](https://pptr.dev/) -  Ferramenta de scraping. O Puppeteer é uma ferramenta utilizada no projeto para automatizar a navegação e interação com a página de [mais vendidos da Amazon](https://www.amazon.com.br/bestsellers)


## Endpoints

### 1. Listar Todos os items
Retorna uma lista com todos os produtos

- **URL:** [dev/items](https://eoe4kudjah.execute-api.us-east-1.amazonaws.com/dev/items)
- **Método:** GET
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Exemplo de Corpo:**
  ```json
  [
    {
        "productID": "B09BK73232",
        "categoria": "Cozinha",
        "name": "Filtro/Refil de Água Acqua Pure para Purificador Electrolux PE12A/PE12B/PE12G/PE12V",
        "price": "R$ 78,90",
    },
    {
        "productID": "6598078806",
        "categoria": "Livros",
        "name": "Café com Deus Pai 2024: Porções Diárias de paz",
        "price": "R$ 66,51",
    }
  ]
  ```

### 2. Pesquisar Item
Retorna o produto pesquisado pelo id

- **URL:** [dev/items/B089XVR312](https://eoe4kudjah.execute-api.us-east-1.amazonaws.com/dev/items/B089XVR312)
- **Método:** GET
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Exemplo de Corpo:**
  ```json

    {
        "productID": "B089XVR312",
        "categoria": "Móveis",
        "name": "Mesa para Escritório Office Estilo Industrial 1,50m Kuadra",
        "price": "R$ 287,90",
    }

  ```

### 3. Deletar Item
Deleta item pelo id

- **URL:** [dev/items/B089XVR312](https://eoe4kudjah.execute-api.us-east-1.amazonaws.com/dev/items/{id})
- **Método:** DELETE
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Exemplo de Corpo:**
  ```json

   { "message": "Item excluido com sucesso" }

  ```

### 4. Buscar todas as categorias
Retorna uma lista com todas as categorias cadastradas no banco de dados.

- **URL:** [dev/category](https://eoe4kudjah.execute-api.us-east-1.amazonaws.com/dev/category)
- **Método:** GET
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Exemplo de Corpo:**
  ```json

   {
    "categories": [
        "Cozinha",
        "Beleza",
        "Livros",
        "Ferramentas",
        "Móveis",
        "Eletrônicos",
        "Computadores"
    ]
  }


  ```


