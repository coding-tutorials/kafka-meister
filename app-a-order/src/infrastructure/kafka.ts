import { Kafka, logLevel, Message, RecordMetadata } from 'kafkajs';
import { logger } from './logger';

const brokers = (process.env.KAFKA_BROKERS ?? 'localhost:9092')
  .split(',')
  .map((broker) => broker.trim())
  .filter(Boolean);
const topic = process.env.KAFKA_ORDER_TOPIC ?? 'orders';

const producer = new Kafka({ clientId: 'app-a-order', brokers, logLevel: logLevel.NOTHING }).producer();

export async function connectProducer(): Promise<void> {
  await producer.connect();
  logger.info({ brokers, topic }, 'kafka producer connected');
}

export async function publish(messages: Message[]): Promise<RecordMetadata[]> {
  const recordsMetadata = await producer.send({ topic, messages });
  logger.info({ topic, messageKeys: messages.map((message) => message.key?.toString()), recordsMetadata }, 'orders published');
  return recordsMetadata;
}
