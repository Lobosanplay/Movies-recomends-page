const OMDBAPI_KEY = import.meta.env.VITE_OMDBAPI_KEY;

export const getPosterImage = async (title: string): Promise<string> => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDBAPI_KEY}`,
    );

    const data = await response.json();
    if (data.Response === "True") {
      return data.Poster as string;
    }

    return "";
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    return "";
  }
};
