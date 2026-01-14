import type { compareResponse } from "../models/compare.model";

export const compareMovies = async (movie1: string, movie2: string): Promise<compareResponse> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/compare?movie1=${movie1}&movie2=${movie2}`)
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      return await response.json();
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
        return {
            "movie1": "",
            "movie2": "",
            "similarity_score": 0,
            "interpretation": {
                "0-0.3": "Poca similitud",
                "0.3-0.6": "Moderadamente similares",
                "0.6-0.8": "Muy similares",
                "0.8-1.0": "Extremadamente similares"
            }
        }
    }
}