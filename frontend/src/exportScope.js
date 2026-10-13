/** Return exportable records, enforcing client-workspace scoping before serialization. */
export function scopeExportRecords(key, records, store, { clientRoute = false, clientName = 'Meridian Workspaces' } = {}) {
  if (!clientRoute) return Array.isArray(records) ? records : [];
  const clientProperties = (store.properties || []).filter((property) => property.client === clientName);
  const propertyNames = new Set(clientProperties.map((property) => property.name));
  if (key === 'workOrders') return (store.workOrders || []).filter((order) => order.client === clientName);
  if (key === 'invoices') return (store.invoices || []).filter((invoice) => invoice.client === clientName);
  if (key === 'properties') return clientProperties;
  if (key === 'schedules') return (store.schedules || []).filter((event) => propertyNames.has(event.property));
  return [];
}
