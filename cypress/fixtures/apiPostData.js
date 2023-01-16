import { faker } from '@faker-js/faker';
const bool = faker.datatype.boolean();

export const number = (n) => {
  return faker.datatype.number(n);
};

export const createUser = () => {
  return {
    userData: [
      {
        TestCase: 'Verify that an active user can be created with valid details',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.internet.email()}`,
        status: 'active',
      },
      {
        TestCase: 'Verify that an inactive user can be created with valid details',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.internet.email()}`,
        status: 'inactive',
      },
    ],
  };
};

export const createUserStatus = (apiResponse) => {
  expect(apiResponse.status).to.eq(201);
  expect(apiResponse.statusText).to.eq('Created');
  expect(apiResponse.isOkStatusCode).to.eq(true);
  expect(apiResponse.body.id).to.match(/\b\d{5}\b/g);
};
