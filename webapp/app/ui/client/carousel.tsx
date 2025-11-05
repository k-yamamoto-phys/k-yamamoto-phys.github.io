'use client';
import { useEffect, useRef, useState } from "react";

export type CarouselProps = {
    image: string;
    caption: string;
};

export function Carousel({
    carousels,
    isFullScreen = false,
}: {
    carousels: CarouselProps[];
    isFullScreen?: boolean;
}) {
    const [index, setIndex] = useState(0);
    const [imageWidth, setImageWidth] = useState<number>(10000);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const next = () => setIndex((i) => (i + 1) % carousels.length);
    const prev = () => setIndex((i) => (i - 1 + carousels.length) % carousels.length);

    // Monitor image size
    useEffect(() => {
        if (!imageRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setImageWidth(entry.contentRect.width);
        });

        observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, [index]); // Re-observe when slide changes

    // Determine display position (show below if image width <= 500px)
    const isNarrow = imageWidth < 500;

    // Auto-play settings
    const AUTOPLAY = 5000; // Switch every 5 seconds
    const AUTOPLAY_PAUSE = 10000; // Wait time before resuming after user interaction
    const [isPaused, setIsPaused] = useState(false);
    const resumeTimer = useRef<NodeJS.Timeout | null>(null); // Timer ID reference
    useEffect(() => {
        if (carousels.length <= 1 || isPaused) return; // Don't autoplay if only one image

        const interval = setInterval(next, AUTOPLAY);
        return () => clearInterval(interval);
    }, [carousels.length, isPaused]);

    const handleAction = (action: ()=> void) => {
        action();
        setIsPaused(true);
        if (resumeTimer.current) {
            clearTimeout(resumeTimer.current); 
        }
        resumeTimer.current = setTimeout(() => {
            setIsPaused(false);
        }, AUTOPLAY_PAUSE);
    }
    useEffect(() => {
        return () => {
            if (resumeTimer.current) {
                clearTimeout(resumeTimer.current);
            }
        }
    }, []);
    return (
        <div
            className={` group not-prose overflow-hidden ${isFullScreen
                    ? "w-screen left-1/2 right-1/2 -mx-[50vw]"
                    : "w-full"
                }`}
        >
            <div className="relative">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {carousels.map((carousel, i) => (
                    <div key={i} className="w-full flex-shrink-0 relative">
                        <img
                            ref={i === index ? imageRef : null} // Only monitor current slide
                            src={carousel.image}
                            alt={carousel.caption}
                            className="w-full max-h-[250px] md:max-h-[300px] lg:max-h-[400px] object-cover"
                        />
                        {/* Show caption based on width */}
                        {!isNarrow && (
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm md:text-base px-3 py-1 rounded-md">
                                {carousel.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ナビゲーション */}
            {carousels.length > 1 && (
                <>
                    <div className="absolute inset-0 flex items-center justify-between px-0">
                        <div
                            onClick={() => handleAction(prev)}
                            className="w-1/4 h-full opacity-0 hover:opacity-5 bg-gray-50 cursor-pointer"
                        ></div>
                        <div
                            onClick={() => handleAction(next)}
                            className="w-1/4 h-full opacity-0 hover:opacity-5 bg-gray-50 cursor-pointer"
                        ></div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {carousels.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleAction(() => setIndex(i))}
                                className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
            </div>
            {/* Show caption below image when narrow */}
            {isNarrow && carousels[index]?.caption && (
                <div className="mt-2 text-center text-sm md:text-base text-gray-700">
                    {carousels[index].caption}
                </div>
            )}
        </div>
    );
}
