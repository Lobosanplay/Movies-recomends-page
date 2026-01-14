export interface SearchMoviesResponse {
  title: string;
  limit: number;
  found: number;
  movies: Movie[];
}

export interface SearchGenresResponse {
  genres: string[];
  query_used: string;
  total_genres: number;
}

export interface Movie {
  movie_id: number;
  title: string;
}
