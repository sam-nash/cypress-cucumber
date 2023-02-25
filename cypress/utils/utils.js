export const responseObject = (key, value) => {
  response.find((object) => object[key] === value);
};

export function findUser(response, targetId) {
  let foundId = false;
  //targetId;
  const data = response.body;
  for (const item of data) {
    if (item.id === targetId) {
      foundId = true;
      //responseObject = item;
      return item;
      break;
    }
  }
  if (!foundId && response.headers["x-links-next"]) {
    const nextUrl = response.headers["x-links-next"];
    cy.getUsers(nextUrl).then(findUser);
  }
}
