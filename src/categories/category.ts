import { DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(dbClient);
const nameTable = "products";

export const getAll = async () => {
  try {
    const itemsResponse = await dynamo.send(
      new ScanCommand({ TableName: nameTable })
    );

    const itemsAll = itemsResponse.Items

    const categories = new Set();

    itemsAll?.forEach(item => {
        if (item.categoria) {
            categories.add(item.categoria.S)
        }
    })

    const categoriesArray = [...categories];

    return {
        statusCode: 200,
        body: JSON.stringify({
          categories: categoriesArray
        })
      };
   
  } catch (error) {
    return {
        status: 404,
        message: "Erro ao pesquisar no Banco de dados",
        error,
      };
  }
};
