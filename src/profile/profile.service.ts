import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository: Repository<Profiles>,
  ) {}

  async create(profile: any): Promise<Profiles> {
    profile.created_at = new Date();
    const isExist = await this.profileRepository.findOne({
      where: { username: profile.username },
    });
    if (isExist) {
      throw new HttpException('Username already exist', 400);
    }
    return this.profileRepository.save(profile);
  }
}
