import test from 'node:test';
import assert from 'node:assert/strict';
import { listWorkOrdersSchema, updateWorkOrderSchema } from '../src/validators/workOrders.js';

test('work-order filters accept the new shared workflow enum and reject the retired dispatch status', () => {
  assert.equal(listWorkOrdersSchema.safeParse({ status: 'PENDING_REVIEW' }).success, true);
  assert.equal(listWorkOrdersSchema.safeParse({ status: 'ON_HOLD' }).success, true);
  assert.equal(listWorkOrdersSchema.safeParse({ status: 'CLIENT_APPROVAL' }).success, true);
  assert.equal(listWorkOrdersSchema.safeParse({ status: 'TECHNICIAN_EN_ROUTE' }).success, false);
});

test('work-order completion requires handover notes and an affirmative site-safety check', () => {
  assert.equal(updateWorkOrderSchema.safeParse({ status: 'COMPLETED' }).success, false);
  assert.equal(updateWorkOrderSchema.safeParse({ status: 'COMPLETED', completionNote: 'Fixed.', siteSafetyConfirmed: true }).success, false);
  assert.equal(updateWorkOrderSchema.safeParse({ status: 'COMPLETED', completionNote: 'Replaced the filter and recorded the airflow reading.' }).success, false);
  assert.equal(updateWorkOrderSchema.safeParse({ status: 'COMPLETED', completionNote: 'Replaced the filter and recorded the airflow reading.', siteSafetyConfirmed: true }).success, true);
  assert.equal(updateWorkOrderSchema.safeParse({ status: 'COMPLETED', completionNote: 'Replaced the filter and recorded the airflow reading.', siteSafetyConfirmed: false }).success, false);
});
