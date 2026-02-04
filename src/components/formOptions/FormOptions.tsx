import { useEffect, useRef, useState } from "react";
import { useMovieSearch } from "../../shared/hooks/useMovieSearch";
import {
  getMoviesRecomendationByGenres,
  getMoviesRecomendationByMovieTitle,
} from "../../shared/services/recomentsMovies.service";
import { compareMovies } from "../../shared/services/compareMovies.service";
import type { recomnedResponse } from "../../shared/models/recoments.model";
import type { compareResponse } from "../../shared/models/compare.model";
import type { Option } from "../../shared/models/options.model";

import MovieInput from "./components/MovieInput";
import SubmitButton from "./components/SubmitButton";
import ErrorDisplay from "./components/ErrorDisplay";
import RecommendationResults from "./components/RecommendationResults";
import CompareResults from "./components/CompareResults";

export default function FormOption(option: Option) {
  const isCompareMode = option.select === "compare";
  const isSearchTagMode = option.select === "tag";

  const firstInput = useMovieSearch("", isSearchTagMode);
  const secondInput = useMovieSearch("", false);

  const dropdownRefSecond = useRef<HTMLDivElement>(null);
  const inputRefFirst = useRef<HTMLInputElement>(null);
  const inputRefSecond = useRef<HTMLInputElement>(null);

  const [moviesRecomendations, setMoviesRecomendations] =
    useState<recomnedResponse | null>(null);
  const [compareResult, setCompareResult] = useState<compareResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRefSecond.current &&
        !dropdownRefSecond.current.contains(target)
      ) {
        secondInput.setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [secondInput]);

  useEffect(() => {
    if (isSearchTagMode) {
      firstInput.setValue("");
      setMoviesRecomendations(null);
      setCompareResult(null);
    } else {
      setMoviesRecomendations(null);
      setCompareResult(null);
    }
  }, [option.select, isSearchTagMode, firstInput]);

  const handleChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    firstInput.setValue(e.target.value);
    firstInput.setShowSuggestions(true);
  };

  const handleChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    secondInput.setValue(e.target.value);
    secondInput.setShowSuggestions(true);
  };

  const handleSuggestionClickFirst = (selectedValue: string) => {
    firstInput.setValue(selectedValue);
    firstInput.setShowSuggestions(false);
  };

  const handleInputBlur = (inputType: "first" | "second") => {
    setTimeout(() => {
      if (inputType === "first") {
        firstInput.setShowSuggestions(false);
      } else {
        secondInput.setShowSuggestions(false);
      }
    }, 200);
  };

  const handleInputFocus = (inputType: "first" | "second") => {
    if (inputType === "first") {
      if (firstInput.movies.length > 0 || firstInput.genres.length > 0) {
        firstInput.setShowSuggestions(true);
      }
    } else {
      if (secondInput.movies.length > 0) {
        secondInput.setShowSuggestions(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstInput.value.trim()) {
      setError(
        `Por favor ingresa ${isSearchTagMode ? "un género/tag" : "un título de película"}`,
      );
      return;
    }

    if (isCompareMode && !secondInput.value.trim()) {
      setError("Por favor ingresa la segunda película para comparar");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMoviesRecomendations(null);
    setCompareResult(null);

    try {
      if (isCompareMode) {
        await handleCompareMode();
      } else if (isSearchTagMode) {
        await handleTagMode();
      } else {
        await handleNormalMode();
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al procesar la solicitud. Intenta nuevamente.",
      );
      setMoviesRecomendations(null);
      setCompareResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNormalMode = async () => {
    const recomendMovies = await getMoviesRecomendationByMovieTitle(
      firstInput.value,
    );

    if (
      !recomendMovies.recommendations ||
      recomendMovies.recommendations.length === 0
    ) {
      throw new Error("No se encontraron recomendaciones para esta película");
    }

    setMoviesRecomendations(recomendMovies);
  };

  const handleTagMode = async () => {
    const tags = firstInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const recomendMovies = await getMoviesRecomendationByGenres(tags, 6);

    if (
      !recomendMovies.recommendations ||
      recomendMovies.recommendations.length === 0
    ) {
      throw new Error("No se encontraron películas para este género/tag");
    }
    console.log(recomendMovies);
    setMoviesRecomendations(recomendMovies);
  };

  const handleCompareMode = async () => {
    const compareMoviesResult = await compareMovies(
      firstInput.value,
      secondInput.value,
    );
    setCompareResult(compareMoviesResult);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 className="text-xl font-semibold">{option.label}</h2>
      </div>

      <div className="space-y-4">
        <MovieInput
          id={option.text}
          label={
            isCompareMode
              ? "First Movie"
              : isSearchTagMode
                ? "Tag Movie"
                : "Movie Title"
          }
          placeholder={option.placeholder1}
          value={firstInput.value}
          onChange={handleChangeFirst}
          onFocus={() => handleInputFocus("first")}
          onBlur={() => handleInputBlur("first")}
          suggestions={firstInput.movies}
          genres={firstInput.genres}
          showSuggestions={firstInput.showSuggestions}
          loading={firstInput.loading}
          onSuggestionClick={handleSuggestionClickFirst}
          isTagMode={isSearchTagMode}
          ref={inputRefFirst}
        />

        {isCompareMode && option.placeholder2 && (
          <div className="animate-slideDown">
            <label
              htmlFor="compare-movie"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Second Movie
            </label>
            <input
              ref={inputRefSecond}
              id="compare-movie"
              type="text"
              name="compare-movie"
              value={secondInput.value}
              placeholder={option.placeholder2}
              onChange={handleChangeSecond}
              onFocus={() => handleInputFocus("second")}
              onBlur={() => handleInputBlur("second")}
              className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
            />
          </div>
        )}
      </div>

      <SubmitButton isLoading={isLoading} isCompareMode={isCompareMode} />

      <ErrorDisplay error={error} />

      <RecommendationResults
        moviesRecomendations={moviesRecomendations}
        isSearchTagMode={isSearchTagMode}
      />

      <CompareResults
        compareResult={compareResult}
        firstMovie={firstInput.value}
        secondMovie={secondInput.value}
      />

      {!moviesRecomendations && !compareResult && !isLoading && !error && (
        <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-700/50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Busca una película
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Ingresa el título de una película para obtener recomendaciones
            personalizadas basadas en tus gustos.
          </p>
        </div>
      )}
    </form>
  );
}
