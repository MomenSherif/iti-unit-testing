import { getWinner } from './utils';

export function logAdminWinner() {
  const admins = ['Safwat', "Mo'men"] as const;
  console.log(`The winner admin is ${getWinner(...admins)} 🚀`);
}
