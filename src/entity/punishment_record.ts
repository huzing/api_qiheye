import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class PunishmentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  listen: number;

  @Column('int')
  reciteWords: number;

  @Column('int')
  exercise: number;

  @Column('int')
  reciteBooks: number;

  @Column('int')
  total: number;

  @Column('int')
  kneel: number;

  @Column('int', {
    name: 'updated_at',
    default: 0,
  })
  updatedAt!: number;
}
