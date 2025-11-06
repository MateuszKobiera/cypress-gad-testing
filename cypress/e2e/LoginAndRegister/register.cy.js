import { faker } from "@faker-js/faker";
import {
  LoginPage,
  RegistrationPage,
  WelcomePage,
} from "../../selectors/LoginAndRegistration";

describe("Register scenario", () => {
  it("User can register on UI", () => {
    cy.visit("/register.html");
    cy.intercept("POST", "api/users").as("Registration");
    const user = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: "1996-12-20",
      password: faker.internet.password(),
    };
    RegistrationPage.FirstNameInput().type(user.name);
    RegistrationPage.LastNameInput().type(user.lastName);
    RegistrationPage.EmailInput().type(user.email);
    RegistrationPage.BirthdayInput.type(user.birthDate);
    RegistrationPage.CloseBirthdayDropdownButton().click();
    RegistrationPage.PasswordInput().type(user.password);
    RegistrationPage.RegisterButton().click();
    cy.wait("@Registration").its("response.statusCode").should("equal", 201);

    cy.url().should("contain", "/login/");

    LoginPage.UsernameInput().type(user.email);
    LoginPage.PasswordInput().type(user.password);
    LoginPage.LoginButton().click();

    cy.url().should("contain", "/welcome");
    WelcomePage.WelcomeMessage().should("have.text", `Hi ${user.email}!`);
  });
  it("User can register through API", () => {
    const user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      birthdate: "1996-12-20",
      password: faker.internet.password(),
      avatar: ".\\data\\users\\b678f2dd-a83e-42b7-9d1c-1a3ff7c224d1.jpg",
    };

    cy.apiRegisterUser(user).then((response) => {
      expect(response.statusCode).to.equal(201);
    });
  });
});
