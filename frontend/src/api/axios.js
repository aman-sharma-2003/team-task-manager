import { BASE_URL } from "../../config";
import axios from "axios";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
