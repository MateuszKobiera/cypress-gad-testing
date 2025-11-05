import { faker } from "@faker-js/faker";

describe("Register scenario", () => {
  it("User can register", () => {
    cy.visit("/register.html");
    cy.intercept("POST", "api/users").as("Registration");
    const user = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: "1996-12-20",
      password: faker.internet.password(),
    };
    cy.get("input[data-testid='firstname-input']").type(user.name);
    cy.get("input[data-testid='lastname-input']").type(user.lastName);
    cy.get("input[data-testid='email-input']").type(user.email);
    cy.get("input[data-testid='birthdate-input']").type(user.birthDate);
    cy.get(".ui-datepicker-close").click();
    cy.get("input[data-testid='password-input']").type(user.password);
    cy.get("input[data-testid='register-button']").click();
    cy.wait("@Registration").its("response.statusCode").should("equal", 201);

    cy.url().should("contain", "/login/");

    cy.get('[action="/process_login"]')
      .find('[id="username"]')
      .type(user.email);
    cy.get('[id="password"]').type(user.password);
    cy.get('[id="loginButton"]').click();

    cy.url().should("contain", "/welcome");
    cy.get('[data-testid="hello"]').should("have.text", `Hi ${user.email}!`);
  });
});
