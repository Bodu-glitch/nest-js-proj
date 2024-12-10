import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from '../profile/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository: Repository<Profiles>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.profileRepository.findOne({ where: { username } });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.username, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30m',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refresh(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30m',
        }),
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
