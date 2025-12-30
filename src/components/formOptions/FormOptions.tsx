import { useEffect, useRef } from "react";
import type { Option } from "../../models/options.model";
import { useMovieSearch } from "../../hooks/useMovieSearch";

export default function FormOption(option: Option) {
    const isCompareMode = option.select === 'compare';
    const isSearchTagMode = option.select === 'tag';
    
    const firstInput = useMovieSearch('', isSearchTagMode);
    const secondInput = useMovieSearch('', false);

    const dropdownRefFirst = useRef<HTMLDivElement>(null);
    const dropdownRefSecond = useRef<HTMLDivElement>(null);
    const inputRefFirst = useRef<HTMLInputElement>(null);
    const inputRefSecond = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            
            if (dropdownRefFirst.current && !dropdownRefFirst.current.contains(target)) {
                firstInput.setShowSuggestions(false);
            }
            
            if (dropdownRefSecond.current && !dropdownRefSecond.current.contains(target)) {
                secondInput.setShowSuggestions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [firstInput, secondInput]);

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

    const handleSuggestionClickSecond = (selectedValue: string) => {
        secondInput.setValue(selectedValue);
        secondInput.setShowSuggestions(false);
    };

    const handleInputBlur = (inputType: 'first' | 'second') => {
        setTimeout(() => {
            if (inputType === 'first') {
                firstInput.setShowSuggestions(false);
            } else {
                secondInput.setShowSuggestions(false);
            }
        }, 200);
    };

    const handleInputFocus = (inputType: 'first' | 'second') => {
        if (inputType === 'first') {
            if (firstInput.movies.length > 0 || firstInput.genres.length > 0) {
                firstInput.setShowSuggestions(true);
            }
        } else {
            if (secondInput.movies.length > 0) {
                secondInput.setShowSuggestions(true);
            }
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
                    ref={inputRefFirst}
                    id={option.text}
                    type="text"
                    name={option.text}
                    value={firstInput.value}
                    placeholder={option.placeholder1}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                    onChange={handleChangeFirst}
                    onFocus={() => handleInputFocus('first')}
                    onBlur={() => handleInputBlur('first')}
                    autoComplete="off"
                />
                
                {firstInput.showSuggestions && (firstInput.movies.length > 0 || firstInput.genres.length > 0) && (
                    <div 
                        ref={dropdownRefFirst}
                        className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm">
                    {firstInput.loading ? (
                        <div className="px-4 py-3 text-gray-400 text-center">
                        Cargando...
                        </div>
                    ) : (
                        <ul className="py-2">
                        {isSearchTagMode ? (
                            <div className="py-2">
                                {firstInput.genres.map((genre, index) => (
                                    <li key={index}>
                                        <button
                                            type="button"
                                            className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                                            onClick={() => handleSuggestionClickFirst(genre)}
                                        >
                                            <span className="flex-1 truncate">{genre}</span>
                                        </button>
                                    </li>
                                ))}
                            </div>
                        ) : (
                            <div className="py-2">
                                {firstInput.movies.map((movie) => (
                                    <li key={movie.movie_id}>
                                    <button
                                        
                                        type="button"
                                        className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                                        onClick={() => handleSuggestionClickFirst(movie.title)}
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

                {firstInput.showSuggestions && !firstInput.loading && 
                    firstInput.movies.length === 0 && 
                    firstInput.genres.length === 0 && 
                    firstInput.debouncedValue.length >= 2 && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm">
                            <div className="px-4 py-3 text-gray-400 text-center">
                                {isSearchTagMode ? 'No se encontraron géneros/tags' : 'No se encontraron películas'}
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
                            ref={inputRefSecond}
                            id="compare-movie"
                            type="text"
                            name="compare-movie"
                            value={secondInput.value}
                            placeholder={option.placeholder2}
                            onChange={handleChangeSecond}
                            onFocus={() => handleInputFocus('second')}
                            onBlur={() => handleInputBlur('second')}
                            className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                        />
                    </div>
                    )}
            </div>
                

            {secondInput.showSuggestions && secondInput.movies.length > 0 && (
                <div 
                    ref={dropdownRefSecond}
                    className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm">
                    {secondInput.loading ? (
                        <div className="px-4 py-3 text-gray-400 text-center">
                            Cargando...
                        </div>
                    ) : (
                        <ul className="py-2">
                            {secondInput.movies.map((movie) => (
                                <li key={movie.movie_id}>
                                    <button
                                        type="button"
                                        className="w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors duration-150 flex items-center gap-3"
                                        onClick={() => handleSuggestionClickSecond(movie.title)}
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

            {secondInput.showSuggestions && !secondInput.loading && 
             secondInput.movies.length === 0 && 
             secondInput.debouncedValue.length >= 2 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-900/95 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm">
                    <div className="px-4 py-3 text-gray-400 text-center">
                        No se encontraron películas
                    </div>
                </div>
            )}

            <button
                type="button"
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
            >
                {isCompareMode ? 'Compare Movies' : 'Get Recommendations'}
            </button>
        </div>
    );
}