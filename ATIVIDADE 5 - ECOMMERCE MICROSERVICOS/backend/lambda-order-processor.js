// lambda-order-processor.js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const order = JSON.parse(event.body);
  
  // Adicionar data e status do pedido
  order.createdAt = new Date().toISOString();
  order.status = 'PENDING';
  
  // Parâmetros para salvar o pedido no DynamoDB
  const params = {
    TableName: 'Orders',
    Item: order
  };
  
  try {
    await docClient.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pedido processado com sucesso!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao processar o pedido', error: error.message })
    };
  }
};
