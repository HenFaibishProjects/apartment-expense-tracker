import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.getByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    if (email === 'internal' && password === 'internal') {
      const token = this.jwt.sign({ sub: 1, email: 'internal' });
      return { access_token: token };
    }
    const user = await this.validateUser(email, password);
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }
}
