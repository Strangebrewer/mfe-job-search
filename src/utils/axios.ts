import axios from "axios";
import { createAuthClient } from "@bka-stuff/mfe-utils";

const BASE_URL = "http://localhost:8080";

export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL });

createAuthClient({
  axiosPublic,
  axiosAuth,
  refreshEndpoint: '/tokens/exchange',
  onLogout: () => {
    // whatever the shell should do
    console.log("Logged out");
  },
}).attach();
