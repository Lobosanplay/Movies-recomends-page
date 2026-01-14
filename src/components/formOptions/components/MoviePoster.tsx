import { useState, useEffect } from 'react';
import { getPosterImage } from "../../../services/getPosteImage.service";

interface MoviePosterProps {
    title: string;
    className?: string;
}

export default function MoviePoster({ title, className }: MoviePosterProps) {
    const [posterUrl, setPosterUrl] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPoster = async () => {
            const url = await getPosterImage(title);
            setPosterUrl(url);
            setLoading(false);
        };
        loadPoster();
    }, [title]);

    if (loading) {
        return (
            <div className={`bg-gray-800 animate-pulse ${className}`}>
                <div className="w-full h-48 bg-gray-700 rounded"></div>
            </div>
        );
    }

    if (!posterUrl || posterUrl === 'N/A') {
        return (
            <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
                <div className="text-gray-500 text-center p-4">
                    <span className="text-3xl">🎬</span>
                    <p className="text-sm mt-2">No hay póster</p>
                </div>
            </div>
        );
    }

    return (
        <img 
            src={posterUrl} 
            alt={`Póster de ${title}`}
            className={`w-full h-auto object-cover rounded ${className}`}
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                    <div class="bg-gray-800 flex items-center justify-center h-full">
                        <div class="text-gray-500 text-center p-4">
                            <span class="text-3xl">🎬</span>
                            <p class="text-sm mt-2">Imagen no disponible</p>
                        </div>
                    </div>
                `;
            }}
        />
    );
};