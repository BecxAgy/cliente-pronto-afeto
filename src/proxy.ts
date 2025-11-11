import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/src/shared/modules/services/token.service';

const PUBLIC_ROUTES = new Set(['/auth/login', '/auth/signup']);
const AUTH_CALLBACK_ROUTE = '/auth-callback';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken();

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const isAuthCallback = pathname === AUTH_CALLBACK_ROUTE;
  const isAuthenticated = Boolean(token);

  // Permite acesso ao callback de autenticação do Google
  if (isAuthCallback) {
    return NextResponse.next();
  }

  // Redireciona usuários autenticados que tentam acessar rotas públicas
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redireciona usuários não autenticados que tentam acessar rotas privadas
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icons|images|favicon.ico).*)'],
};
