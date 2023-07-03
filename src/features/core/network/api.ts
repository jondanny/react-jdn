import axios from "axios";

import { environment } from "../../../app/environment";
import { store } from "../../../app/store";
import { authError } from "../../auth/auth.slice";

const api = axios.create({
  baseURL: environment.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const { dispatch } = store;

    if (err.response.status === 401) {
      dispatch(authError());
    }

    return Promise.reject(err);
  }
);

export default api;
