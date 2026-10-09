import { createMockOrder } from './application/orderGenerator';
import { connectProducer, publish } from './infrastructure/kafka';
import { logger } from './infrastructure/logger';

const MIN_DELAY_MS = 3000;
const MAX_DELAY_MS = 10000;


async function publishOrder(): Promise<void> {
  try {
    const order = createMockOrder();
    logger.info({ orderKey: order.key }, 'order created');
    await publish([order]);
  } catch (error) {
    logger.error({ err: error }, 'failed to publish order');
  }

  setTimeout(async () => {
    await publishOrder();
  }, MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS));
}

async function start(): Promise<void> {
  await connectProducer();
  logger.info('kafka producer connected');
  await publishOrder();
}


start()