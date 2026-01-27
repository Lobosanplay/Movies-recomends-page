import type { compareResponse } from "../../../models/compare.model";
import MoviePoster from "./MoviePoster";

interface CompareResultsProps {
  compareResult: compareResponse | null;
  firstMovie: string;
  secondMovie: string;
}

export default function CompareResults({
  compareResult,
  firstMovie,
  secondMovie,
}: CompareResultsProps) {
  if (!compareResult) return null;

  const similarityScore = compareResult.similarity_score;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-emerald-400";
    if (score >= 0.6) return "text-green-400";
    if (score >= 0.3) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return "🎯";
    if (score >= 0.6) return "✨";
    if (score >= 0.3) return "🔄";
    return "⚠️";
  };

  const percentage = similarityScore * 100;

  return (
    <div className="mt-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 p-6 mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
              <span className="text-white text-xl">🎬</span>
            </div>
            <h3 className="text-xl font-bold bg-linear-to-r from-orange-200 to-red-200 bg-clip-text text-transparent">
              Comparación de Películas:
            </h3>
            <span className="px-3 py-1 bg-orange-900/50 rounded-full text-orange-300 font-medium">
              {firstMovie}
            </span>
            <span className="text-gray-400">vs</span>
            <span className="px-3 py-1 bg-red-900/50 rounded-full text-red-300 font-medium">
              {secondMovie}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative overflow-hidden rounded-2xl border border-orange-800/30 bg-linear-to-br from-gray-900 to-gray-950 p-6 transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-900/20">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-orange-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-linear-to-r from-orange-600 to-orange-700 rounded-xl">
                  <span className="text-white text-2xl">🎞️</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Película 1
                  </div>
                  <h5 className="text-lg font-bold text-orange-300">
                    {firstMovie}
                  </h5>
                </div>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                🎬
              </div>
            </div>
            <div className="mt-2">
              <MoviePoster
                title={firstMovie}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-400">
                <span className="text-orange-400 font-medium">
                  Comparando con:
                </span>{" "}
                {secondMovie}
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-red-800/30 bg-linear-to-br from-gray-900 to-gray-950 p-6 transition-all hover:border-red-500/50 hover:shadow-xl hover:shadow-red-900/20">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-red-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-linear-to-r from-red-600 to-red-700 rounded-xl">
                  <span className="text-white text-2xl">🎞️</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Película 2
                  </div>
                  <h5 className="text-lg font-bold text-red-300">
                    {secondMovie}
                  </h5>
                </div>
              </div>
              <div className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                🎬
              </div>
            </div>
            <div className="mt-2">
              <MoviePoster
                title={secondMovie}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <span className="text-red-400 font-medium">Score:</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(similarityScore)}`}
                >
                  {similarityScore.toFixed(3)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mt-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">{getScoreIcon(similarityScore)}</span>
            Nivel de Similitud
          </h4>
          <span
            className={`text-3xl font-bold ${getScoreColor(similarityScore)}`}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>0%</span>
            <span>Similitud</span>
            <span>100%</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-linear-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-out`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            {[0, 0.3, 0.6, 0.8, 1].map((point) => (
              <div
                key={point}
                className={`text-xs ${similarityScore >= point ? "text-orange-300" : "text-gray-500"}`}
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { range: "0-0.3", label: "Baja", color: "bg-red-500" },
            { range: "0.3-0.6", label: "Media", color: "bg-yellow-500" },
            { range: "0.6-0.8", label: "Alta", color: "bg-green-500" },
            { range: "0.8-1.0", label: "Muy Alta", color: "bg-emerald-500" },
          ].map((item) => (
            <div
              key={item.range}
              className={`text-center p-2 rounded-lg transition-all ${
                similarityScore >= parseFloat(item.range.split("-")[0])
                  ? `${item.color} text-white`
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              <div className="text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
