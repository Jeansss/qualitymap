class UserFactory {
  gender: string;
  firstName: string;
  lastName: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.gender = `User Test ${Math.floor(Math.random() * 1000)}`;
    this.firstName = `User Test ${Math.floor(Math.random() * 1000)}`;
    this.lastName = `User Test ${Math.floor(Math.random() * 1000)}`;
    this.dayOfBirth = "1";
    this.monthOfBirth = "1";
    this.yearOfBirth = "2000";
    this.email = `user${Math.floor(Math.random() * 1000)}@test.com`;
    this.company = `Company Test ${Math.floor(Math.random() * 1000)}`;
    this.password = 'newPassword50*';
    this.confirmPassword = 'newPassword50*';
  }

  setBlankFirstName() {
    this.firstName = '';
  }

  setBlankLastName() {
    this.lastName = '';
  }

  setBlankEmail() {
    this.email = '';
  }

  setInvalidEmail() {
    this.email = 'invalidEmail';
  }

  setBlankCompany() {
    this.company = '';
  }

  setBlankPassword() {
    this.password = '';
    this.confirmPassword = '';
  }

  setInvalidPassword() {
    this.password = 'inv';
    this.confirmPassword = '';
  }

  setBlankConfirmPassword() {
    this.confirmPassword = '';
  }

  setInvalidConfirmPassword() {
    this.confirmPassword = 'inv*';
  }
}

export { UserFactory };