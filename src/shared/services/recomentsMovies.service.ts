import type { recomnedResponse } from "../models/recoments.model";

const API_URL = import.meta.env.VITE_API_URL;
export const getMoviesRecomendationByMovieTitle = async (
  title: string,
): Promise<recomnedResponse> => {
  try {
    const response = await fetch(
      `${API_URL}api/v1/recommend/by-title?title=${title}&limit=6`,
    );
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    return {
      query: "",
      limit: 0,
      found_movies: 0,
      recommendations: [],
    };
  }
};

export const getMoviesRecomendationByGenres = async (
  tags: string[],
  limit: number = 6,
): Promise<recomnedResponse> => {
  try {
    const payload = {
      tags: tags,
      limit: limit,
    };

    const response = await fetch(`${API_URL}api/v1/recommend/by-tags`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    return {
      query: tags.join(", "),
      limit: limit,
      found_movies: 0,
      recommendations: [],
    };
  }
};
