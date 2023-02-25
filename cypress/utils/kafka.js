const { Kafka, logLevel } = require("kafkajs");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// a single broker instance that we connect to
const brokers = ["localhost:9092"];

//Producer code
const produce = async (message, topic) => {
  const kafka = new Kafka({
    clientId: "test-" + topic,
    brokers,
    logLevel: logLevel.NOTHING,
  });
  const data = () => {
    return {
      //key: 'key',
      value: JSON.stringify(message),
    };
  };
  //to publish messages to Kafka you have to create a producer by calling the producer function of the client.
  const producer = kafka.producer();
  await producer.connect();
  //The method send is used to publish messages to the Kafka cluster.
  await producer.send({
    topic: topic,
    messages: [data()],
  });
  //disconnect the producer after the message is sent.
  await producer.disconnect();
  return data().value;
};

//Consumer code
const consume = async (topic) => {
  let responseData = [];
  const kafka = new Kafka({
    clientId: "test-" + topic,
    brokers,
    logLevel: logLevel.NOTHING,
  });
  const consumer = kafka.consumer({
    groupId: "group-" + topic,
  });
  await consumer.connect();
  await consumer.subscribe({
    topic,
    fromBeginning: false,
  });
  await consumer.run({
    autoCommit: true,
    eachMessage: ({ message }) => {
      responseData.push(JSON.parse(message.value.toString()));
    },
  });

  await sleep(5000);
  await consumer.stop();
  await consumer.disconnect();
  //console.log(data);
  return responseData;
};

module.exports = { produce, consume };
