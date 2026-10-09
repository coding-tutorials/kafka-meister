# kafka-meister

## Order generator

Start Kafka and run the order producer:

```sh
docker compose up -d kafka
cd app-a-order
npm ci
npm run build
npm start
```

The app publishes a mock order every second to the `orders` topic. It connects to
`localhost:9092` by default. Set `KAFKA_BROKERS` to a comma-separated broker list
and `KAFKA_ORDER_TOPIC` to change the topic.

Traces are exported over OTLP/HTTP to `http://localhost:4318` (override with
`OTEL_EXPORTER_OTLP_ENDPOINT`). Each order gets its own trace, the `traceparent` is
sent in the Kafka message headers, and log lines include `trace_id`.

Use `npm run dev` to run from source with reload, and `npm run typecheck` to check types.
