import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/siteConfig.js';

test('site configuration is India-market  data with replaceable contact, map and timezone details', () => {
  assert.match(siteConfig.phone, /^\+91\s/);
  assert.equal(siteConfig.timezone, 'Asia/Kolkata');
  assert.equal(siteConfig.currency, 'INR');
  assert.match(siteConfig.email, /\.example$/);
  assert.match(siteConfig.mapEmbedUrl, /output=embed/);
  assert.match(siteConfig.directionsUrl, /destination=/);
  assert.equal(siteConfig.officeLabel, 'Northline Facilities');
});

test('six configurable social links include the current X identity and non-root placeholder profiles', () => {
  const links = siteConfig.socialLinks;
  assert.equal(links.length, 6);
  assert.deepEqual(links.map((link) => link.name), ['Instagram','Facebook','LinkedIn','WhatsApp','X','YouTube']);
  assert.equal(links.find((link) => link.name === 'X')?.icon, 'x');
  assert.ok(links.every((link) => link.placeholder && new URL(link.href).pathname !== '/'));
});
