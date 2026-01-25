import { useState, useEffect } from "react";
import {
  searchMoviesByTitle,
  searchGenresByString,
} from "../services/searchNamesMovies.service";
import type { Movie } from "../models/search.models";

export const useMovieSearch = (initialValue = "", isTagMode = false) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedValue.trim().length < 2) {
        setMovies([]);
        setGenres([]);
        return;
      }

      setLoading(true);
      try {
        if (isTagMode) {
          const data = await searchGenresByString(debouncedValue);
          setGenres(data.genres);
        } else {
          const data = await searchMoviesByTitle(debouncedValue);
          setMovies(data.movies || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMovies([]);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedValue, isTagMode]);

  return {
    value,
    setValue,
    movies,
    genres,
    loading,
    showSuggestions,
    setShowSuggestions,
    debouncedValue,
  };
};
