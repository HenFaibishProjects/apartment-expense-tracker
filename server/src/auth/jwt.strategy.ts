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
        const user = await this.usersRepo.findOneBy({ id: payload.sub });
        if (!user) return null;

        return { id: user.id, email: user.email }; // only what you need in req.user
    }
}
