import { Api } from "@/services/api";

interface IUser {
  name?: string;
  token?: string;
}

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) return null;

  const user = JSON.parse(json);
  return user ?? null;
}

export async function LoginRequest(name: string, password: string) {
  try {
    const request = await Api.post("login", {
      name,
      password,
    });
    return request.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
