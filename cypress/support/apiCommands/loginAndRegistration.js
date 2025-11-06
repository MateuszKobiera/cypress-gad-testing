Cypress.Commands.add("apiRegisterUser", (payload) => {
  cy.request({
    method: "POST",
    url: "/api/users",
    body: payload,
  });
});
