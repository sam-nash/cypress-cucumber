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
        email: `${faker.internet.email()}`,
        status: 'active',
      },
      {
        TestCase:
          'Verify that an inactive female user can be created with valid details',
        name: `${faker.name.firstName()}`,
        gender: 'female',
        email: `${faker.internet.email()}`,
        status: 'inactive',
      },
      {
        TestCase: 'Verify that an active user can be created with valid name',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.internet.email()}`,
        status: 'active',
      },
      {
        TestCase: 'Verify that an active user can be created with valid email',
        name: `${faker.name.firstName()}`,
        gender: `${faker.name.sexType()}`,
        email: `${faker.internet.email()}`,
        status: 'active',
      },
    ],
  };
};

export const updateUser = () => {
  const test = createUser();
  return {
    userData: [
      {
        TestCase: 'Verify that gender details of an user can be updated',
        id: userIds[0],
        gender: 'female',
        ExpectedResult: {
          id: userIds[0],
          name: test.userData[0].name,
          gender: 'female',
          email: createUser().userData[0].email,
          status: createUser().userData[0].status,
        },
      },
      // {
      //   TestCase: 'Verify that status of an user can be updated',
      //   id: userIds[1],
      //   status: 'active',
      //   ExpectedResult: {
      //     id: userIds[1],
      //     name: createUser().userData[1].name,
      //     gender: createUser().userData[1].gender,
      //     email: createUser().userData[1].email,
      //     status: updateUser().userData[1].status,
      //   },
      // },
      // {
      //   TestCase: 'Verify that name of an user can be updated',
      //   id: userIds[2],
      //   name: `${faker.name.firstName()}`,
      //   ExpectedResult: {
      //     id: userIds[2],
      //     name: updateUser().userData[2].name,
      //     gender: createUser().userData[2].gender,
      //     email: createUser().userData[2].email,
      //     status: createUser().userData[2].status,
      //   },
      // },
      // {
      //   TestCase: 'Verify that email of an user can be updated',
      //   id: userIds[3],
      //   email: `${faker.internet.email()}`,
      //   ExpectedResult: {
      //     id: userIds[3],
      //     name: createUser().userData[3].name,
      //     gender: createUser().userData[3].gender,
      //     email: updateUser().userData[3].email,
      //     status: createUser().userData[3].status,
      //   },
      // },
    ],
  };
};

export const createUserStatus = (apiResponse) => {
  expect(apiResponse.status).to.eq(201);
  expect(apiResponse.statusText).to.eq('Created');
  expect(apiResponse.isOkStatusCode).to.eq(true);
  expect(apiResponse.body.id).to.match(/\b\d{5,6}\b/g);
};
