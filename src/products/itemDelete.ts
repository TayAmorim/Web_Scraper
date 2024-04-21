import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const deleteItem = async (event: { pathParameters: { id: string } }) => {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: nameTable,
        Key: {
          productId: event.pathParameters.id,
        },
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item excluido com sucesso" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao deletar o item do DynamoDB" }),
    };
  }
};
