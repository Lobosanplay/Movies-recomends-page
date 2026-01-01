import type { recomnedResponse } from "../models/recoments.model";

export const getMoviesRecomendationByMovieTitle = async (title: string): Promise<recomnedResponse> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/recommend/by-title?title=${title}&limit=6`)
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      return await response.json();
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
        return {
            query: '',
            limit: 0,
            found_movies: 0,
            recommendations: [],
        }
    }
}