import { useEffect, useRef, useState } from "react";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import { getMoviesRecomendationByMovieTitle } from "../../services/recomentsMovies.service";
import type { recomnedResponse } from "../../models/recoments.model";
import type { Option } from "../../models/options.model";

export default function FormOption(option: Option) {
    const isCompareMode = option.select === 'compare';
    const isSearchTagMode = option.select === 'tag';
    
    const firstInput = useMovieSearch('', isSearchTagMode);
    const secondInput = useMovieSearch('', false);

    const dropdownRefFirst = useRef<HTMLDivElement>(null);
    const dropdownRefSecond = useRef<HTMLDivElement>(null);
    const inputRefFirst = useRef<HTMLInputElement>(null);
    const inputRefSecond = useRef<HTMLInputElement>(null);

    const [moviesRecomendations, setMoviesRecomendations] = useState<recomnedResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (isSearchTagMode) {
            firstInput.setValue('')
            setMoviesRecomendations(null)
        } else {
            setMoviesRecomendations(null)
        }
    })

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!firstInput.value.trim()) {
            setError(`Por favor ingresa ${isSearchTagMode ? 'un género/tag' : 'un título de película'}`);
            return;
        }

        if (isCompareMode && !secondInput.value.trim()) {
            setError("Por favor ingresa la segunda película para comparar");
            return;
        }

        setIsLoading(true);
        setError(null);
        setMoviesRecomendations(null);
        
        try {
            if (isCompareMode) {
                await handleCompareMode();
            } else if (isSearchTagMode) {
                await handleTagMode();
            } else {
                await handleNormalMode();
            }
        } catch (err) {
            console.error('Error en handleSubmit:', err);
            setError(err instanceof Error ? err.message : "Error al procesar la solicitud. Intenta nuevamente.");
            setMoviesRecomendations(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNormalMode = async () => {
        const recomendMovies = await getMoviesRecomendationByMovieTitle(firstInput.value);
        
        if (!recomendMovies.recommendations || recomendMovies.recommendations.length === 0) {
            throw new Error("No se encontraron recomendaciones para esta película");
        }
        
        setMoviesRecomendations(recomendMovies);
    };

    const handleTagMode = async () => {
        console.log("Proximamente Genres mode")
    };

    const handleCompareMode = async () => {
        console.log("Proximamente comparacion")
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn relative">
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
                        required
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
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium transition-all transform shadow-lg hover:shadow-xl ${
                    isLoading 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:from-purple-700 hover:to-pink-700 hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                    </span>
                ) : (
                    isCompareMode ? 'Compare Movies' : 'Get Recommendations'
                )}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {moviesRecomendations && !isCompareMode && !isSearchTagMode && (
                <div className="mt-8 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold">
                            Recomendaciones para: <span className="text-purple-300">{moviesRecomendations.query}</span>
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
                                
                                <h4 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h4>
                                
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/50">
                                    <div className="text-xs text-gray-400">
                                        Puntuación: <span className="text-yellow-400 font-medium">{movie.similarity_score.toFixed(4)}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Rank: <span className="text-blue-400 font-medium">{movie.rank}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-sm text-gray-400">Películas encontradas</div>
                                <div className="text-2xl font-bold text-blue-400">{moviesRecomendations.found_movies}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Límite de resultados</div>
                                <div className="text-2xl font-bold text-purple-400">{moviesRecomendations.limit}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Mostrando</div>
                                <div className="text-2xl font-bold text-green-400">{moviesRecomendations.recommendations.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {moviesRecomendations && isSearchTagMode && (
                <div className="mt-8 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold">
                            Películas del género: <span className="text-green-300">{moviesRecomendations.query}</span>
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {moviesRecomendations.recommendations.map((movie, index) => (
                            <div key={movie.movie_id} className="bg-gray-900/50 border border-green-700/30 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                                        #{index + 1}
                                    </span>
                                    <div className="text-sm text-green-400 font-medium">
                                        Género: {moviesRecomendations.query}
                                    </div>
                                </div>
                                <h4 className="font-semibold text-lg mb-2">{movie.title}</h4>
                                <div className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-800/50">
                                    ID: {movie.movie_id}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {moviesRecomendations && isCompareMode && (
                <div className="mt-8 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold">
                            Comparación: <span className="text-orange-300">{firstInput.value}</span> vs <span className="text-red-300">{secondInput.value}</span>
                        </h3>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-orange-700/30 rounded-xl p-6 mb-6">
                        <h4 className="font-semibold text-lg mb-4 text-center">Similitudes encontradas</h4>
                        <div className="space-y-4">
                            {moviesRecomendations.recommendations.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                                    <span className="font-medium">{item.title}</span>
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-400">
                                            Similitud: <span className="text-yellow-400 font-bold">{(item.similarity_score * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
                            <h5 className="font-semibold mb-2 text-orange-400">{firstInput.value}</h5>
                            <div className="text-sm text-gray-400">
                                Películas en común: {moviesRecomendations.found_movies}
                            </div>
                        </div>
                        <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
                            <h5 className="font-semibold mb-2 text-red-400">{secondInput.value}</h5>
                            <div className="text-sm text-gray-400">
                                Índice de similitud: {moviesRecomendations.recommendations.reduce((acc, item) => acc + item.similarity_score, 0).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!moviesRecomendations && !isLoading && !error && (
                <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-700/50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Busca una película</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Ingresa el título de una película para obtener recomendaciones personalizadas basadas en tus gustos.
                    </p>
                </div>
            )}
        </form>
    );
}