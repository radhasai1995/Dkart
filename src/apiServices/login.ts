import axios from 'axios';
import { LOG_IN } from './apiConstant';

export const logInApi = (userName: string, password: string) => {
  return axios.post(LOG_IN, { user_name: userName, password });
};
