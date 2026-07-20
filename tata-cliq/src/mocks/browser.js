import { setupWorker } from 'msw/browser';
import { productHandlers } from './handlers/productHandlers';

export const worker = setupWorker(...productHandlers);