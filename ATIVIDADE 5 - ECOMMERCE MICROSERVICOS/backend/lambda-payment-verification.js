// lambda-payment-verification.js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const paymentNotification = JSON.parse(event.Records[0].Sns.Message);
  
  // Extrair informações do pagamento
  const { orderId, paymentStatus } = paymentNotification;
  
  // Atualizar o status do pedido no DynamoDB
  const params = {
    TableName: 'Orders',
    Key: { orderId: orderId },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': paymentStatus }
  };
  
  try {
    await docClient.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Status do pagamento atualizado com sucesso!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao atualizar o status do pagamento', error: error.message })
    };
  }
};
