// jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('🔍 JwtAuthGuard - Guard called');
    const request = context.switchToHttp().getRequest();
    console.log('🔍 JwtAuthGuard - Authorization header:', request.headers.authorization);

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('🔍 JwtAuthGuard - handleRequest called');
    console.log('🔍 JwtAuthGuard - Error:', err);
    console.log('🔍 JwtAuthGuard - User:', user);
    console.log('🔍 JwtAuthGuard - Info:', info);

    if (err || !user) {
      console.log('❌ JwtAuthGuard - Authentication failed');
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}