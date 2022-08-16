import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
