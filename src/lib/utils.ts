import crypto from 'crypto';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buff) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buff);
      }
    });
  });

  return buf.toString('hex').slice(0, length);
}
