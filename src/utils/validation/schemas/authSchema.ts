import * as yup from 'yup';

const singUpSchema = yup.object({
  body: yup.object({
    // fullName: yup.string().trim().min(3).required(),
    email: yup
      .string()
      .trim()
      .email('Must be a valid email!')
      .required('Email field cannot be empty!'),
    password: yup.string().trim().min(6).required(),
    // dob: yup.date(),
  }),
});

const logInSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .trim()
      .email('Must be a valid email!')
      .required('Email field cannot be empty!'),
    password: yup.string().min(6).required(),
  }),
});

export { singUpSchema, logInSchema };
