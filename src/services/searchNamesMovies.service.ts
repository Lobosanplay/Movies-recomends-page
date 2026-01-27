import type {
  SearchMoviesResponse,
  SearchGenresResponse,
} from "../models/search.models";

export const searchMoviesByTitle = async (
  title: string,
): Promise<SearchMoviesResponse> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/search/movies?query=${encodeURIComponent(title)}`,
    );
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    return await response.json();
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
      `http://127.0.0.1:8000/api/v1/search/genres?query=${encodeURIComponent(query)}&match_type=contains`,
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
