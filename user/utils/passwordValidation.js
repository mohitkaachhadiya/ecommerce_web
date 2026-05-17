export const isStrongPassword = (password) => {
  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const digit = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    upperCase.test(password) &&
    lowerCase.test(password) &&
    digit.test(password) &&
    specialChar.test(password)
  );
};
