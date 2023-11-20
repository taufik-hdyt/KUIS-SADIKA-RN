import axios from "axios";

const UserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/user",
});

// const avatarApi = axios.create({
//   baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/avatars",
// });
const avatarApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/avatars",
});

const questionsApi = axios.create({
  baseURL: "http://127.0.0.1/api/questions",
});

export { UserApi, avatarApi, questionsApi };
