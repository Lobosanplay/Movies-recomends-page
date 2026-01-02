export interface recomnedResponse {
    query: string;
    limit: number;
    found_movies: number;
    recommendations: recomnedData[]
}

export interface recomnedData {
    title: string;
    movie_id: number;
    similarity_score: number;
    rank: number;
}