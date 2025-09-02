import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const auth = request.headers.get('authorization');
  
  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  
  // Simple password protection (username: admin, password: preview123)
  const [scheme, encoded] = auth.split(' ');
  const buffer = Buffer.from(encoded, 'base64');
  const [username, password] = buffer.toString().split(':');
  
  if (username === 'admin' && password === 'preview123') {
    return NextResponse.next();
  }
  
  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
