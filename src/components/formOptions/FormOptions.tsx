import { useEffect, useState, useRef } from "react";
import { search } from "../../services/searchNamesMovies.service";

interface Option {
  label: string;
  select: string;
  text: string;
  placeholder1: string;
  placeholder2?: string;
}

interface Movie {
  movie_id: number;
  title: string;
}

export default function FormOption(option: Option) {
    const isCompareMode = option.select === 'compare';
    const isSearchTagMode = option.select === 'tag';
    const [value, setValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedValue(value);
        }, 300); 

        return () => clearTimeout(timer);
    }, [value]);

    useEffect(() => {
        const fetchSuggestions = async () => {
        if (debouncedValue.trim().length < 2) { 
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const data = await search(debouncedValue);
            setSuggestions(data.movies || []);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
        };

        fetchSuggestions();
    }, [debouncedValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleSuggestionClick = (movieTitle: string) => {
        setValue(movieTitle);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
        setShowSuggestions(false);
        }, 200);
    };

    const handleInputFocus = () => {
        if (suggestions.length > 0) {
        setShowSuggestions(true);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn relative">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-xl font-semibold">{option.label}</h2>
            </div>

            <div className="space-y-4">
                <div className="relative">
                <label htmlFor={option.text} className="block text-sm font-medium text-gray-300 mb-2">
                    {isCompareMode ? 'First Movie' : isSearchTagMode ? 'Tag Movie' : 'Movie Title'}
                </label>
                <input
                    ref={inputRef}
                    id={option.text}
                    type="text"
                    name={option.text}
                    value={value}
                    placeholder={option.placeholder1}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                />
                
                {showSuggestions && suggestions.length > 0 && (
                    <div 
                        ref={dropdownRef}
                        className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm">
                    {loading ? (
                        <div className="px-4 py-3 text-gray-400 text-center">
                        Cargando...
                        </div>
                    ) : (
                        <ul className="py-2">
                        {suggestions.map((movie) => (
                            <li key={movie.movie_id}>
                            <button
                                
                                type="button"
                                className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                                onClick={() => handleSuggestionClick(movie.title)}
                            >
                                <span className="flex-1 truncate">{movie.title}</span>
                                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                ID: {movie.movie_id}
                                </span>
                            </button>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                )}

                {showSuggestions && !loading && suggestions.length === 0 && debouncedValue.length >= 2 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm">
                    <div className="px-4 py-3 text-gray-400 text-center">
                        No se encontraron películas
                    </div>
                    </div>
                )}
                </div>

                {isCompareMode && option.placeholder2 && (
                <div className="animate-slideDown">
                    <label htmlFor="compare-movie" className="block text-sm font-medium text-gray-300 mb-2">
                    Second Movie
                    </label>
                    <input
                    id="compare-movie"
                    type="text"
                    name="compare-movie"
                    placeholder={option.placeholder2}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                    />
                </div>
                )}
            </div>

            <button
                type="button"
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
            >
                {isCompareMode ? 'Compare Movies' : 'Get Recommendations'}
            </button>
        </div>
    );
}