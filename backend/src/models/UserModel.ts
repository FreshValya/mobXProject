import {Model} from './Model';

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export class UserModel extends Model {
  static tableName = 'users';

  public static async createUser<Payload extends Omit<UserType, 'id'>>(data: Payload) {
    return super.insert<Payload, UserType>({
      ...data,
    });
  }

  public static findByEmail(email: string) {
    return super.findBy<
      {
        email: string;
      },
      UserType
    >({email});
  }
}
