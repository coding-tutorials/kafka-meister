import { SpanStatusCode, trace } from '@opentelemetry/api';
import { Kafka, logLevel, Message, RecordMetadata } from 'kafkajs';
import pino from 'pino';


const brokers = (process.env.KAFKA_BROKERS ?? 'localhost:9092')
  .split(',')
  .map((broker) => broker.trim())
  .filter(Boolean);
const topic = process.env.KAFKA_ORDER_TOPIC ?? 'orders';

const logger = pino({ name: 'app-a-order', level: process.env.LOG_LEVEL ?? 'info' });
const tracer = trace.getTracer('app-a-order');
const producer = new Kafka({ clientId: 'app-a-order', brokers, logLevel: logLevel.NOTHING }).producer();

export async function publish(messages: Message[]): Promise<RecordMetadata[]> {
    return producer.send({ topic, messages  });
}
