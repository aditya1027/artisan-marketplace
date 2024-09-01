export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setCustomerDetails = (customerDetails) => {
  localStorage.setItem('customerDetails', customerDetails);
};

export const getCustomerDetails = () => {
  return localStorage.getItem('customerDetails');
};

export const removeCustomerDetails = () => {
  localStorage.removeItem('customerDetails');
};

export const isTokenValid = () => {
  const token = getToken();
  return !!token;
};
