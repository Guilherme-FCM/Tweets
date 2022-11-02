import { Sequelize } from 'sequelize';
import { User } from './user.entity';

describe('User Entity Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize('postgres://postgres:root@localhost:5432/tweets');
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  afterEach(() => {
    sequelize.close();
  });

  it('Create a new user', async () => {
    const user = await User.create({
      name: 'Guilherme Feitosa',
      email: 'guilherme_fcm@hotmail.com',
      password: 'Senh@123',
    });

    await user.save();

    const createdUser = await User.findOne({
      where: { email: 'guilherme_fcm@hotmail.com' },
    });

    expect(createdUser.name).toBe('Guilherme Feitosa');
    expect(createdUser.email).toBe('guilherme_fcm@hotmail.com');
    expect(createdUser.password).toBe('Senh@123');
  });
});
