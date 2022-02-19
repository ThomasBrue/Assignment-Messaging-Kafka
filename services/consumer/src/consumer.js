const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new kafka.Consumer(client, [
  { topic: "Payments", partition: 0 },
]);

consumer.on("message", async function (message) {
  console.log(message);
});
