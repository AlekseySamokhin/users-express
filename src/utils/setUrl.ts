import config from '../config';

const {
  server: { serverUrl },
} = config;

const setURLAvatar = (avatarName: string) => {
  return `${serverUrl}/avatars/${avatarName}`;
};

const setURLBookPoster = (coverName: string) => {
  return `${serverUrl}/books/${coverName}`;
};

const setUrl = {
  setURLAvatar,
  setURLBookPoster,
};

export { setUrl };
