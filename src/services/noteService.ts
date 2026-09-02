import axios from "axios";
import type { Note } from "../types/note";

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type CreateNoteParams = {
  title: string;
  content: string;
  tag: string;
};

const Api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page = 1,
  search = "",
  perPage = 10,
): Promise<FetchNotesResponse> => {
  const res = await Api.get("/notes", { params: { page, search, perPage } });
  return res.data;
};

export const createNote = async (newNote: CreateNoteParams) => {
  const res = await Api.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await Api.delete(`/notes/${id}`);
  return res.data;
};
