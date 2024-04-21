import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const getItems = async () => {
  try {
    const itemsResponse = await dynamo.send(
      new ScanCommand({ TableName: nameTable })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: JSON.stringify(itemsResponse.Items),
      }),
    };
  } catch (error) {
    return {
      status: 404,
      message: "Erro pesquisar no Banco de dados",
      error,
    };
  }
};
