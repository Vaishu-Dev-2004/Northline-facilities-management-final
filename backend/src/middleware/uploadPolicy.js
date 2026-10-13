import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { HttpError } from '../utils/httpError.js';

const ALLOWED = new Map([
  ['.pdf', new Set(['application/pdf'])],
  ['.png', new Set(['image/png'])],
  ['.jpg', new Set(['image/jpeg'])],
  ['.jpeg', new Set(['image/jpeg'])]
]);

export function validateUploadMetadata({ originalName, mimeType, sizeBytes }, maxBytes = Number(process.env.MAX_UPLOAD_BYTES || 10 * 1024 * 1024)) {
  const basename = path.basename(String(originalName || ''));
  const extension = path.extname(basename).toLowerCase();
  const allowedMimes = ALLOWED.get(extension);
  if (!basename || basename.length > 240 || !allowedMimes || !allowedMimes.has(mimeType)) {
    throw new HttpError(422, 'This file type is not supported. Upload a PDF, PNG or JPG.');
  }
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0 || sizeBytes > maxBytes) {
    throw new HttpError(413, 'The file exceeds the allowed upload size.');
  }
  return { safeDisplayName: basename.replace(/[\u0000-\u001f\\/]/g, '_'), mimeType, sizeBytes };
}

export function generatedStorageKey(extension) {
  const ext = String(extension || '').toLowerCase();
  if (!ALLOWED.has(ext)) throw new HttpError(422, 'This file type is not supported.');
  return `${randomUUID()}${ext}`;
}
