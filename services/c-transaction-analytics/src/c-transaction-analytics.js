const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new kafka.Consumer(client, [
  { topic: "LaunderyCheck", partition: 0 },
]);

consumer.on("message", async function (resp) {
  message = JSON.parse(resp.value);

  if (message && message.amount) {
    if (message.amount > 1000) {
      console.log("EXECUTE_DECLINE: ", message.amount);
    } else if (message.amount <= 1000) {
      console.log("EXECUTE_PASS: ", message.amount);
    }
  }
});
