const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

let messageId = 0;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

setInterval(() => {
  const rndInt = randomIntFromInterval(1, 1500);

  const payload = [
    {
      topic: "Payments",
      messages: JSON.stringify({
        messageId: `id_${messageId++}`,
        amount: rndInt,
        paymentStatus: null,
      }),
    },
  ];

  producer.send(payload, function (error, result) {
    if (error) {
      console.log("Sending payload failed: ", error);
    } else {
      console.log("Sending payload result:", result);
    }
  });
}, 3000);
