import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('pppp1111', 10)
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'Kevin',
    email: 'kevin@example.com',
    password: bcrypt.hashSync('pppp2222', 10)
  },
  user: undefined,
  jwt: undefined
};

const seedDatabase = async () => {
  jest.setTimeout(20000);
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo }
