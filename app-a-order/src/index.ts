import { createMockOrder } from './application/orderGenerator';
import { publish } from './infrastructure/kafka';

async function publishOrder(): Promise<void> {
  const order = createMockOrder();
  const orders = [order]
  await publish(orders);

  setTimeout(() => {
    publishOrder();
  }, 1000);
}

publishOrder();