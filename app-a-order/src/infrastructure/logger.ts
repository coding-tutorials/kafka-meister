import pino from 'pino';

// With the pino auto-instrumentation, every line logged inside a span gets trace_id and span_id.
export const logger = pino({ name: 'app-a-order', level: process.env.LOG_LEVEL ?? 'info' });
