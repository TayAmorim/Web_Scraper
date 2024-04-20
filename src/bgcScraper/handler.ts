import { ProductProps } from "../scraperTypes";
const { bestseller } = require("../scraper");
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');




const dbClient = new DynamoDBClient({region: 'sa-east-1'});
const nameTable = 'products'

export const handlerScrapperBd = async () =>  {
  try {
    const listProduct: ProductProps[] | undefined = await bestseller();
    

    if (listProduct) {
      for (let product of listProduct) {
        const params = {
            TableName: nameTable,
            Item: {
                ...product
            }
        }
        await dbClient.send(new PutItemCommand(params))
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Produtos cadastrados com sucesso',
        },
      ),
    };
  } catch (error) {
    console.log('Erro ao cadastrar produtos no Banco de dados', error);
    return {status: 500, message: 'Erro ao cadastrar no banco de dados'}
    
  } 
}


