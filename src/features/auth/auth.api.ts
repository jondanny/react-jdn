import { store } from "../../app/store";
import api from "../core/network/api";
import { authError, loginSuccess, setErrors, setLoading, userLoaded } from "./auth.slice";

const { dispatch } = store;

export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  files: File[];
}

export const login = async (data: LoginInfo) => {
  try {
    dispatch(setLoading(true));
    const res = await api.post("/login", data);
    dispatch(loginSuccess(res.data.accessToken));
    loadUser();
  } catch (err: unknown) {
    console.error(err);
    dispatch(authError());
    console.log("Login failed");
  }
};

export const register = async (data: RegisterInfo) => {
  try {
    dispatch(setLoading(true));
    dispatch(setErrors([]));

    const formData = new FormData();
    data.files.forEach((file) => formData.append("files", file));
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    await api.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setLoading(false));
    window.location.href = "/login";
  } catch (err: any) {
    console.error(err);

    const { message } = err.response?.data || {};
    dispatch(setErrors(message || "Register failed"));
    dispatch(setLoading(false));
  }
};

export const loadUser = async () => {
  try {
    dispatch(setLoading(false));
    const { data } = await api.get("/users/me");
    dispatch(userLoaded(data));
  } catch (err: any) {
    dispatch(authError());
    console.log("Cannot get info");
  }
};
