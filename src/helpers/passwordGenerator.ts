import { PasswordParams } from '../types';

export const passwordGenerator = (passwordParams: PasswordParams) => {
  const { length } = passwordParams;
  let charset = '';
  let password = '';

  if (passwordParams.uppercaseMode) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (passwordParams.lowercaseMode) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (passwordParams.numbersMode) {
    charset += '0123456789';
  }

  if (passwordParams.symbolsMode) {
    charset += '!@#$%^&*()-_=+[{]}|;:,<.>/?';
  }

  if (
    !passwordParams.uppercaseMode
    && !passwordParams.lowercaseMode
    && !passwordParams.numbersMode
    && !passwordParams.symbolsMode
  ) {
    charset = '';

    return password;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);

    password += charset[randomIndex];
  }

  return password;
};
