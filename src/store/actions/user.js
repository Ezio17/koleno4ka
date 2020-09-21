import * as type from '../constants/user';

export const setError = error => ({
  type: type.SET_ERROR,
  error
});

export const setUser = (user, token) => ({
  type: type.SET_USER,
  user: {
    user,
    token
  }
});