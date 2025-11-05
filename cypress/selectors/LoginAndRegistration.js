export class RegistrationPage {
  static FirstNameInput = () => cy.get("input[data-testid='firstname-input']");
  static LastNameInput = () => cy.get("input[data-testid='lastname-input']");
  static EmailInput = () => cy.get("input[data-testid='email-input']");
  static BirthdayInput = () => cy.get("input[data-testid='birthdate-input']");
  static CloseBirthdayDropdownButton = () => cy.get(".ui-datepicker-close");
  static PasswordInput = () => cy.get("input[data-testid='password-input']");
  static RegisterButton = () => cy.get("input[data-testid='register-button']");
}

export class LoginPage {
  static UsernameInput = () =>
    cy.get('[action="/process_login"]').find('[id="username"]');
  static PasswordInput = () => cy.get('[id="password"]');
  static LoginButton = () => cy.get('[id="loginButton"]');
}

export class WelcomePage {
  static WelcomeMessage = () => cy.get('[data-testid="hello"]');
}
