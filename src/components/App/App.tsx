import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () => fetchNotes(page, searchQuery),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>

        <SearchBox value={searchInputValue} onChange={handleSearchChange} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong!</p>}

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
