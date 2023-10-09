import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EDishesType } from '../dict/recipe';
// import { NoUpdateEntity } from './base';

@EntityModel()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  type: EDishesType;

  @Column('text')
  description: string;

  @Column()
  count: string;

  @Column('text')
  cover: number;
}
