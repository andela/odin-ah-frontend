import validate from 'validate.js';

/**
 *
 *
 * @class UserValidator
 */
class UserValidator {
  constructor() {
    this.email = {
      presence: true,
      length: {
        minimum: 1,
        message: 'not provided'
      },
      email: {
        message: 'provided is not valid'
      }
    };
    this.password = {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters'
      },
    };
    this.confirmPassword = {
      equality: 'password',
    };
    this.username = {
      presence: true,
      length: {
        minimum: 4,
        message: 'must be at least 4 characters'
      },
      format: {
        pattern: /^[a-zA-Z0-9]{1,15}$/,
        message() {
          return 'must be alphanumeric';
        }
      }
    };
  }

  validateSignUp(data) {
    const constraints = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      username: this.username
    };
    return validate.validate(data, constraints);
  }

  validateField(data) {
    const constraints = {};
    Object.keys(data)
      .filter(name => this[name])
      .forEach((name) => {
        constraints[name] = this[name];
      });

    return validate.validate(data, constraints);
  }
}

const userValidator = new UserValidator();
export default userValidator;
