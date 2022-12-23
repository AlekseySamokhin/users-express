import * as yup from 'yup';

const getUser = {
  params: {
    id: yup.string(),
  },
};

const updateUser = {
  params: {
    id: yup.string(),
  },

  body: {
    fullName: yup.string().trim().min(3),
    email: yup.string().trim().email(),
    password: yup.string(),
  },
};

const removeUser = {
  params: {
    id: yup.string(),
  },
};

export { getUser, removeUser, updateUser };
