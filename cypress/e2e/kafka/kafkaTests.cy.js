const { faker } = require('@faker-js/faker');
const { orderSummary } = require('../../utils/orderSummary');
let orderData, orderConfirmation, topic;

before(() => {
  //Customer Order input data
  orderData = {
    customerName: faker.name.firstName(),
    customerEmail: faker.internet.email(),
    item: 'apple',
    quantity: '2',
    transactionId: faker.datatype.uuid(),
  };
  topic = 'orders';
  orderConfirmation = orderSummary(orderData); //process the order
});

it('Sends data to the Kafka producer', () => {
  //Calls the Kafka Producer which takes the user order input data
  cy.log('The Customer Order is : ' + JSON.stringify(orderData));
  cy.kafkaProduce(orderConfirmation, topic).then(() => {
    cy.log('Success! Order Sent for processing...');
  });
});

it('Reads data from the Kafka consumer', () => {
  //Calls the Kafka Consumer which reads the user order confirmation data
  cy.kafkaConsume(topic).then((response) => {
    cy.log(response);
    const expectedResponseObject = response.find(
      (object) => object.transactionId === orderData.transactionId
    );
    cy.log('our expected response is : ');
    cy.log(expectedResponseObject);
    expect(orderData.customerName).to.eq(
      expectedResponseObject.customerDetails.customerName
    );
    expect(orderData.customerEmail).to.eq(
      expectedResponseObject.customerDetails.customerEmail
    );
    expect(orderData.item).to.eq(expectedResponseObject.itemDetails.name);
    expect(orderData.quantity).to.eq(
      expectedResponseObject.itemDetails.quantity
    );
    expect(expectedResponseObject.orderNumber).to.match(/\b\d{6}\b/g);
  });
});
