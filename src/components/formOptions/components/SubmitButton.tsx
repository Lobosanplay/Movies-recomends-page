interface SubmitButtonProps {
    isLoading: boolean;
    isCompareMode: boolean;
}

export const SubmitButton = ({ isLoading, isCompareMode }: SubmitButtonProps) => {
    return (
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
    );
};