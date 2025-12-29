export interface SearchResponse {
  query: string;
  limit: number;
  found: number;
  movies: Movie[];
}

export interface Movie {
  movie_id: number;
  title: string;
}

export const search = async (query: string): Promise<SearchResponse> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/search?query=${encodeURIComponent(query)}`)
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return await response.json();
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
        return { query, limit: 10, found: 0, movies: [] };
    }
}