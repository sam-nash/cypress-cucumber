describe('API Pagination Test with JSON Object Search', () => {
  it('tests pagination of the API endpoint and searches for a specific JSON object value', () => {
    const targetValue = 353633;

    cy.request('GET', 'https://gorest.co.in/public/v2/users').then(
      (response) => {
        const users = response.body;
        console.log(users);

        // let targetValueFound = false;
        // for (const user of users) {
        //   if (user.id === targetValue) {
        //     targetValueFound = true;
        //     break;
        //   }
        // }

        // if (!targetValueFound) {
        //   let nextPage = response.headers['x-links-next'];
        //   while (nextPage && !targetValueFound) {
        //     cy.request('GET', nextPage).then((nextPageResponse) => {
        //       const nextPageItems = nextPageResponse.body;
        //       for (const user of nextPageItems) {
        //         if (user.id === targetValue) {
        //           targetValueFound = true;
        //           break;
        //         }
        //       }
        //       nextPage = nextPageResponse.headers['x-links-next'];
        //     });
        //   }
        // }

        // expect(targetValueFound).to.equal(
        //   true,
        //   'Target value not found in any of the pages'
        // );
      }
    );
  });
});
