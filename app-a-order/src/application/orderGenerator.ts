import { randomUUID } from 'node:crypto';


export function createMockOrder() {
  const orderBody = {
      status: 'CREATED',
  }

  return {
    key: `order-${randomUUID()}`,
    value: JSON.stringify(orderBody),
  }
}
