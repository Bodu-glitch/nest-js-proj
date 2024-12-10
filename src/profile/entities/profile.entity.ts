import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
