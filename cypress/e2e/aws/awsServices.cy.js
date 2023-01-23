const cypressConfig = require("../../../cypress.config");

it("Lists the S3 objects in a bucket", () => {
  const params = {
    Bucket: "samtestnash",
  };

  cy.task("listAWSS3Objects", params).then((objects) => {
    cy.log(objects.find((element) => element.Key === "1.json"));
  });
});
