export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequiredField = (value) => {
  return value.trim() !== '';
};

export const validateTermsAccepted = (isAccepted) => {
  return isAccepted === true;
};

export const isEmpty = (value) => {
  return !value || value.trim() === '';
};