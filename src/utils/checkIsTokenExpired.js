import jwt_decode from "jwt-decode";

const checkIsTokenExpired = (token) => {
  const decoded = jwt_decode(token);
  const dateNow = new Date();

  return decoded.exp * 1000 < dateNow.getTime();
};

export default checkIsTokenExpired;
