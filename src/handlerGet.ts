import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const getItems = async () => {
  try {
    const itemsResponde = await dynamo.send(
      new ScanCommand({ TableName: nameTable })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: JSON.stringify(itemsResponde),
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
