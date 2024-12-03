import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nest-todo-hgkn.onrender.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiRequest.interceptors.request.use((req) => {
  console.log(req.baseURL);

  return req;
});
apiRequest.interceptors.response.use((res) => {
  console.log(res);
  return res;
});

export default apiRequest;
