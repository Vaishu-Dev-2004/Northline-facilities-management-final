import test from 'node:test';
import assert from 'node:assert/strict';
import { invoices, properties, schedules, workOrders } from '../src/demoData.js';
import { scopeExportRecords } from '../src/exportScope.js';

const store = { invoices, properties, schedules, workOrders };
const clientName = 'Meridian Workspaces';

for (const [key, expected] of [
  ['workOrders', workOrders.filter((record) => record.client === clientName)],
  ['invoices', invoices.filter((record) => record.client === clientName)],
  ['properties', properties.filter((record) => record.client === clientName)],
  ['schedules', schedules.filter((record) => properties.some((property) => property.client === clientName && property.name === record.property))]
]) {
  test(`client CSV scope for ${key} excludes other demo tenants`, () => {
    const actual = scopeExportRecords(key, store[key], store, { clientRoute: true });
    assert.deepEqual(actual, expected);
    if (key !== 'schedules') assert.ok(actual.every((record) => record.client === clientName));
    else assert.ok(actual.every((record) => properties.some((property) => property.client === clientName && property.name === record.property)));
  });
}

test('client workspace cannot export an unsupported collection', () => {
  assert.deepEqual(scopeExportRecords('users', [{ id: 'US-01' }], { users: [{ id: 'US-01' }] }, { clientRoute: true }), []);
});

test('administrative exports retain their available full dataset', () => {
  assert.deepEqual(scopeExportRecords('workOrders', workOrders, store), workOrders);
  assert.deepEqual(scopeExportRecords('missing', undefined, store), []);
});
