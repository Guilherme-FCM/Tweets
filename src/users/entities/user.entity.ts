import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Tweet } from 'src/tweets/entities/tweet.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  telephone?: string;

  @Column
  email?: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column(DataType.DATE)
  birthDate: string;

  @HasMany(() => Tweet)
  tweets: Tweet[];
}
