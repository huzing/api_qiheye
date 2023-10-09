import dayjs = require('dayjs');
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class NoUpdateEntity {
  @CreateDateColumn({
    select: true,
    name: 'created_at',
    type: 'int',
    default: '0',
    transformer: {
      from: (value: number) => value,
      to: () => dayjs().unix(),
    },
  })
  createdAt!: number;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt!: Date;
}

export abstract class BaseEntity extends NoUpdateEntity {
  @Column('int', {
    select: false,
    name: 'updated_at',
    default: 0,
  })
  updatedAt!: number;

  @BeforeUpdate()
  protected _updateDateUpdate() {
    this.updatedAt = dayjs().unix();
  }
}
