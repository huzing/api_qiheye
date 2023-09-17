import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('user')
export class UserEntity {
  @PrimaryColumn('int')
  id!: number;

  @Column('varchar', {
    comment: '用户名',
    length: 20,
    default: '默认用户',
  })
  nickname!: string;

  @Column('text', {
    comment: '密码',
  })
  password!: string;
}
