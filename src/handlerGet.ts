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
    const itemsAll = itemsResponse.Items;


    const itemsArray = itemsAll?.map((item) => ({
      productId: item.productId.S,
      name: item.name.S,
      categoria: item.categoria.S,
      price: item.price.S,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: itemsArray,
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
