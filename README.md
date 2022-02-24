# Assignment: Messaging

https://github.com/ThomasBrue/Assignment-Messaging-Kafka

## Introduction

This repository showcases an apache-kafka example project.

It consists of three services:

1. p-core-banking-system

The p-core-banking-system generates a payload (3 second interval) with an amount between 1 and 1500 (randomly).
This payload is marked with the topic name 'Payments' and sent to the kafka server.

2. cp-money-laundering

The cp-money-laundering service receives the payload from Kafka marked with the topic name 'Payment'.
If the amount is greater than 1000 the paymentStatus is set to 'DECLINE'.
If the amount is below 1000 the paymentStatus is set to 'ACCEPT'.
The payload is sent to Kafka with a new topic name called 'LaunderyCheck'.

3. c-transaction-analytics

The c-transaction-analytics service receives the payload marked with the topic name 'paymentStatus'.
If the paymentStatus is set to 'ACCEPT' the payment can fulfilled.
If the paymentStatus is set to 'DECLINE' the payment will be declined.
(You can see the 'ACCEPT' and 'Decline' in the logs.)

## How to run?

1. `docker-compose build`
2. `docker-compose up`

## Expected output

After running the `docker-compose up` command you should see that ever three seconds there is a log from each service.
