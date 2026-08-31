import axios from "axios";
import { Note, FetchNotesResponse } from "../types/note";

const Api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});
