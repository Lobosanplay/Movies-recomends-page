interface Option {
  label: string;
  select: string;
  text: string;
  placeholder1: string;
  placeholder2?: string;
}

export default function FormOption(option: Option) {
  const isCompareMode = option.select === 'compare';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 className="text-xl font-semibold">{option.label}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor={option.text} className="block text-sm font-medium text-gray-300 mb-2">
            {isCompareMode ? 'First Movie' : 'Movie Title'}
          </label>
          <input
            id={option.text}
            type="text"
            name={option.text}
            placeholder={option.placeholder1}
            className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
          />
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
  )
}