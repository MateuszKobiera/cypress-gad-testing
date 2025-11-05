import { faker } from "@faker-js/faker";

describe("Register scenario", () => {
  beforeEach(() => {
    cy.visit();
  });

  it("User can register", () => {
    const user = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: "1996-12-20",
      password: faker.internet.password(),
    };
    cy.get("input[data-testid='firstname-input']")
      .should("have.property", "placeholder", "Enter User First Name")
      .type(user.name);
    cy.get("input[data-testid='lastname-input']").type(user.lastName);
    cy.get("input[data-testid='email-input']").type(user.email);
    cy.get("input[data-testid='birthdate-input']").type(user.birthDate);
    cy.get("input[data-testid='password-input']").type(user.password);
    cy.get("input[data-testid='register-button']").click();
  });
});
