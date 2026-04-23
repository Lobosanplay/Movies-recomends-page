import type { recomnedResponse } from "../../../shared/models/recoments.model";
import MoviePoster from "./MoviePoster";

interface RecommendationResultsProps {
  moviesRecomendations: recomnedResponse | null;
  isSearchTagMode: boolean;
}

export default function RecommendationResults({
  moviesRecomendations,
  isSearchTagMode,
}: RecommendationResultsProps) {
  if (!moviesRecomendations) return null;

  if (isSearchTagMode) {
    return (
      <div className="mt-8 animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-8 bg-linear-to-b from-green-500 to-emerald-500 rounded-full"></div>
          <h3 className="text-lg font-semibold">
            Películas del género:{" "}
            <span className="text-green-300">
              {moviesRecomendations.query_tags}
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moviesRecomendations.recommendations.map((movie, index) => (
            <div
              key={movie.movie_id}
              className="bg-gray-900/50 border border-green-700/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                  #{index + 1}
                </span>
                <div className="text-sm text-green-400 font-medium">
                  Género: {moviesRecomendations.query_tags}
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-2">{movie.title}</h4>
              <div className="mt-2">
                <MoviePoster
                  title={movie.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-800/50">
                ID: {movie.movie_id}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"></div>
        <h3 className="text-lg font-semibold">
          Recomendaciones para:{" "}
          <span className="text-purple-300">{moviesRecomendations.query}</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {moviesRecomendations.recommendations.map((movie, index) => (
          <div
            key={movie.movie_id}
            className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                  #{index + 1}
                </span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                  ID: {movie.movie_id}
                </span>
              </div>
              <div className="text-sm font-semibold text-green-400">
                {(movie.similarity_score * 100).toFixed(1)}% match
              </div>
            </div>

            <h4 className="font-semibold text-lg mb-2 line-clamp-1">
              {movie.title}
            </h4>

            <div className="mt-2">
              <MoviePoster
                title={movie.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/50">
              <div className="text-xs text-gray-400">
                Puntuación:{" "}
                <span className="text-yellow-400 font-medium">
                  {movie.similarity_score.toFixed(4)}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Rank:{" "}
                <span className="text-blue-400 font-medium">{movie.rank}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Películas encontradas</div>
            <div className="text-2xl font-bold text-blue-400">
              {moviesRecomendations.found_movies}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Límite de resultados</div>
            <div className="text-2xl font-bold text-purple-400">
              {moviesRecomendations.limit}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Mostrando</div>
            <div className="text-2xl font-bold text-green-400">
              {moviesRecomendations.recommendations.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
