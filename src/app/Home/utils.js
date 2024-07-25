import { forbiddenWords } from './constants';

export const validateGroupName = (_, value) => {
  if (forbiddenWords.some(word => value.toLowerCase().includes(word))) {
    return Promise.reject(new Error('Group name contains inappropriate content'));
  }
  return Promise.resolve();
};