let userIds;
it('Get all Users from the default(first) page & Store the IDs', () => {
  cy.getUsers().then((response) => {
    userIds = response.body.map((user) => user.id);
    cy.log(
      `The users from the first page are : ${JSON.stringify(response.body)}`
    );
  });
});
it('Delete the above users', () => {
  userIds.forEach((userId) => {
    cy.deleteUser(userId).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
it('Query the above users and verify they do not exist', () => {
  userIds.forEach((userId) => {
    cy.getUser(userId).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('Resource not found');
    });
  });
});
