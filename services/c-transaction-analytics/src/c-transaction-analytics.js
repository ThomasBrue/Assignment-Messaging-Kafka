const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new kafka.Consumer(client, [
  { topic: "LaunderyCheck", partition: 0 },
]);

const declinedTransactions = [];
const acceptedTransactions = [];

consumer.on("message", async function (resp) {
  message = JSON.parse(resp.value);

  console.log(resp);

  if (message && message.amount) {
    if (message.paymentStatus == "DECLINE") {
      console.log("EXECUTE_DECLINE: ", message.amount);
      declinedTransactions.push(message);
    } else if (message.paymentStatus == "ACCEPT") {
      console.log("EXECUTE_ACCEPT: ", message.amount);
      acceptedTransactions.push(message);
    }
    displayResult();
  }
});

function displayResult() {
  console.log(
    "Number of declined transactions: " + declinedTransactions.length
  );
  console.log(
    "Number of accepted transactions: " + acceptedTransactions.length
  );
}
