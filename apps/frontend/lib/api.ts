// PATH: apps/frontend/lib/api.ts
import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
