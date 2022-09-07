import { Result } from '../utils';

const fakeUserInfo = {
  userId: '1',
  username: 'zwt',
  realName: '章文涛',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  roles: [
    {
      roleName: '超级管理员',
      value: 'super',
    },
  ],
};
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo);
  }

  async getUserInfoById() {
    return Result.success(fakeUserInfo);
  }
}
