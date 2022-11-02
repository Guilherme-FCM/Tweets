import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'tweets' })
export class Tweet extends Model {
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
