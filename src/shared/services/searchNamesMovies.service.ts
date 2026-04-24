import type {
  SearchMoviesResponse,
  SearchGenresResponse,
} from "../models/search.models";

const API_URL = import.meta.env.VITE_API_URL;

export const searchMoviesByTitle = async (
  title: string,
): Promise<SearchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}api/v1/search/movies?query=${encodeURIComponent(title)}`,
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    return { title, limit: 10, found: 0, movies: [] };
  }
};

export const searchGenresByString = async (
  query: string,
): Promise<SearchGenresResponse> => {
  try {
    const response = await fetch(
      `${API_URL}api/v1/search/genres?query=${encodeURIComponent(query)}&match_type=contains`,
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    return { genres: [], query_used: "contains", total_genres: 0 };
  }
};
