// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ 
  groupId: clientId,
  // // minBytes: 5,
	// // maxBytes: 1e6,
  // 	// wait for at most 3 seconds before receiving new data
	// maxWaitTimeInMs: 3000, 
})

 export const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: false  })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: async ({ message }) => {
			try {
				console.log({
					value: message.value.toString(),
				})
				return message.value.toString()
			} catch(e) {
				console.log(e)
			}
		},
	})
}
// consume()
// module.exports = consume