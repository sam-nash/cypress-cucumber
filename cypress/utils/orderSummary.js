const { faker } = require("@faker-js/faker");
//Object of items and their prices
const itemPrice = {
  apple: 22.09,
  banana: 4.5,
  orange: 6.78,
};
//Calculate total price based on quantity and item price
const itemTotal = (item, quantity) => {
  return itemPrice[item] * quantity;
};
//An Order Summary
const orderSummary = (orderData) => {
  return {
    customerDetails: {
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
    },
    transactionId: orderData.transactionId,
    orderNumber: faker.random.numeric(6, { bannedDigits: ["0"] }),
    itemDetails: {
      name: orderData.item,
      quantity: orderData.quantity,
    },
    orderTotal: itemTotal(orderData.item, orderData.quantity),
  };
};

module.exports = {
  orderSummary,
};
