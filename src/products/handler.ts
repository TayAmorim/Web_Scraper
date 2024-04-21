import { bestseller } from "../scraper/scraper";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const handlerScrapperBd = async () => {
  try {
    const listProduct = await bestseller();

    if (listProduct != null && listProduct.length > 0) {
      for (let product of listProduct) {
        const params = {
          TableName: nameTable,
          Item: {
            ...product,
          },
        };
        await dynamo.send(new PutCommand(params));
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: JSON.stringify(listProduct),
        }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Lista vazia ${listProduct}`,
      }),
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro ao cadastrar no banco de dados",
      error,
    };
  }
};
