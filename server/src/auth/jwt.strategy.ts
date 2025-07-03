import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentUser } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(ApartmentUser)
        private usersRepo: Repository<ApartmentUser>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secret-key',
        });
    }

    async validate(payload: { sub: number }) {
        console.log('🔍 JWT Strategy - Received payload:', payload);
        console.log('🔍 JWT Strategy - Looking for user with ID:', payload.sub);

        const user = await this.usersRepo.findOneBy({ id: payload.sub });
        console.log('🔍 JWT Strategy - Found user:', user);

        if (!user) {
            console.log('❌ JWT Strategy - User not found, returning null');
            return null;
        }

        const result = { id: user.id, email: user.email };
        console.log('✅ JWT Strategy - Returning user:', result);
        return result;
    }
}
