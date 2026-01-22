export interface compareResponse {
  movie1: string;
  movie2: string;
  similarity_score: number;
  interpretation: {
    "0-0.3": string;
    "0.3-0.6": string;
    "0.6-0.8": string;
    "0.8-1.0": string;
  };
}
