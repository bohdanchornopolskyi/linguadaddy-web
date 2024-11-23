import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:* https://localhost:* *.paddle.com/"
  );
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  return response;
}
