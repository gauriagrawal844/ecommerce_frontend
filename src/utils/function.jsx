import { ERROR_MSG } from '../constants/constants';

export const getSuccessMessage = (res) => {
  return res?.data?.message;
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || ERROR_MSG;
};
