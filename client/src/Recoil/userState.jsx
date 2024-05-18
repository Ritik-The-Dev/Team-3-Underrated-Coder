import { atom } from 'recoil';

// Define the userInfo atom
const userInfo = atom({
  key: 'userInfo',
  default: undefined,
});

export default userInfo;
