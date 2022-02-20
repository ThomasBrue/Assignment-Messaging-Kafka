const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new kafka.Consumer(client, [
  { topic: "Payments", partition: 0 },
]);

const producer = new kafka.Producer(client);

consumer.on("message", async function (resp) {
  // resp = JSON.parse(resp);
  console.log("----- [consumer] -----------------------------");
  console.log(resp);

  message = JSON.parse(resp.value);

  if (message && message.amount) {
    if (message.amount > 1000) {
      console.log("DECLINE: ", message.amount);
    } else if (message.amount <= 1000) {
      console.log("PASS: ", message.amount);
    }
  }

  const payload = [
    {
      topic: "LaunderyCheck",
      messages: JSON.stringify(message),
    },
  ];

  producer.send(payload, function (error, result) {
    console.log("Sending LaunderyCheck-payload to Kafka");
    if (error) {
      console.log("Sending payload failed: ", error);
    } else {
      console.log("Sending payload result:", result);
    }
  });
});
