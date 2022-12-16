import express from 'express';
// import userRepository from 'src/db';

// import User from '../db/entities/User';

const router = express.Router();

const createUser = router.post('/', async (req) => {
  const userData = req.body;

  // eslint-disable-next-line no-console
  console.log(userData);

  // const { fullName, email, password, dob } = userData;

  // const user = new User();
});

export default createUser;
