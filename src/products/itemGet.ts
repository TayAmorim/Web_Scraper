import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const getItem = async (event: { pathParameters: { id: string } }) => {
  const id = event.pathParameters.id
  try {
    const response = await dynamo.send(
      new GetCommand({
        TableName: nameTable,
        Key: {
          productId: id
        },
      })
    );

    const item = response.Item;

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item não encontrado" }),
      };
    }


    return {
      status: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error("Erro ao obter o item do DynamoDB:", error); 
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao obter o item do DynamoDB" }),
    };
  }
};
