import axios from 'axios';
import {LOGIN_URL, SIGNUP_URL} from '../api/urls';
import Config from '../Config';
import chest from '../api/chest';
import fetchHandler from '../network/fetchHandler';
import headers from '../api/headers';
export const login = data => {
  console.log(LOGIN_URL);
  console.log(data);
  return fetchHandler(LOGIN_URL, {
    method: 'post',
    headers: headers(),
    body: JSON.stringify(data),
  });
};

export const SignUp = data => {
  console.log(SIGNUP_URL);
  console.log(data);
  return fetchHandler(SIGNUP_URL, {
    method: 'post',
    headers: headers(),
    body: JSON.stringify(data),
  });
};
