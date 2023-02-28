import { faker } from '@faker-js/faker';
const bool = faker.datatype.boolean();
//const { userIds } = require('./userIds.json');

export const number = (n) => {
  return faker.datatype.number(n);
};

export const createUser = () => {
  return {
    userData: [
      {
        TestCase:
          'Verify that an active male user can be created with valid details',
        name: `${faker.name.firstName()}`,
        gender: 'male',
        email: `${faker.name.firstName()}1@mydearmail.com`,
        status: 'active',
      },
      {
        TestCase:
          'Verify that an inactive female user can be created with valid details',
        name: `${faker.name.firstName()}`,
        gender: 'female',
        email: `${faker.name.firstName()}1@mydearmail.com`,
        status: 'inactive',
      },
      {
        TestCase: 'Verify that an active user can be created with valid name',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.name.firstName()}1@mydearmail.com`,
        status: 'active',
      },
      {
        TestCase: 'Verify that an active user can be created with valid email',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.name.firstName()}1@mydearmail.com`,
        status: 'active',
      },
    ],
  };
};

export const createUserStatus = (apiResponse) => {
  expect(apiResponse.status).to.eq(201);
  expect(apiResponse.statusText).to.eq('Created');
  expect(apiResponse.isOkStatusCode).to.eq(true);
  expect(apiResponse.body.id).to.match(/\b\d{5,6}\b/g);
};
