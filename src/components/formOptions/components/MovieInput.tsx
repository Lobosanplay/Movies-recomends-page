import { useRef } from "react";
import type { Movie } from "../../../shared/models/search.models";

interface MovieInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  suggestions: Movie[];
  genres: string[];
  showSuggestions: boolean;
  loading: boolean;
  onSuggestionClick: (value: string) => void;
  isTagMode?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export default function MovieInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  suggestions,
  genres,
  showSuggestions,
  loading,
  onSuggestionClick,
  isTagMode = false,
  ref,
}: MovieInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type="text"
        name={id}
        value={value}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        required
      />

      {showSuggestions && (suggestions.length > 0 || genres.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm"
        >
          {loading ? (
            <div className="px-4 py-3 text-gray-400 text-center">
              Cargando...
            </div>
          ) : (
            <ul className="py-2">
              {isTagMode ? (
                <div className="py-2">
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                        onClick={() => onSuggestionClick(genre)}
                      >
                        <span className="flex-1 truncate">{genre}</span>
                      </button>
                    </li>
                  ))}
                </div>
              ) : (
                <div className="py-2">
                  {suggestions.map((movie) => (
                    <li key={movie.movie_id}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                        onClick={() => onSuggestionClick(movie.title)}
                      >
                        <span className="flex-1 truncate">{movie.title}</span>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          ID: {movie.movie_id}
                        </span>
                      </button>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          )}
        </div>
      )}

      {showSuggestions &&
        !loading &&
        suggestions.length === 0 &&
        genres.length === 0 &&
        value.length >= 2 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm">
            <div className="px-4 py-3 text-gray-400 text-center">
              {isTagMode
                ? "No se encontraron géneros/tags"
                : "No se encontraron películas"}
            </div>
          </div>
        )}
    </div>
  );
}
