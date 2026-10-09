import { createMockOrder } from './application/orderGenerator';
import { connectProducer, publish } from './infrastructure/kafka';
import { logger } from './infrastructure/logger';


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
  }, 1000);
}

async function start(): Promise<void> {
  await connectProducer();
  logger.info('kafka producer connected');
  await publishOrder();
}


start()