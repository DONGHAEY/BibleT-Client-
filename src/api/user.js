import axios from "axios";

export const loginApi = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const logoutApi = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const authenticateApi = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/api/auth/authenticate");
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const registerApi = ({ username, password, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        password,
        email,
      });
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

// const { data } = await axios.post("/api/auth/register", {
//     username,
//     password,
//     email,
//   });
