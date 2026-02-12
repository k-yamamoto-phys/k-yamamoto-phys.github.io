'use client';
import { useEffect, useRef, useState } from "react";

export type CrouselProps = {
    image: string;
    caption: string;
};

export function Crousel({
    crousels,
    isFullScreen = false,
}: {
    crousels: CrouselProps[];
    isFullScreen?: boolean;
}) {
    const [index, setIndex] = useState(0);
    const [imageWidth, setImageWidth] = useState<number>(10000);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const next = () => setIndex((i) => (i + 1) % crousels.length);
    const prev = () => setIndex((i) => (i - 1 + crousels.length) % crousels.length);

    // ✅ 画像サイズ監視
    useEffect(() => {
        if (!imageRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setImageWidth(entry.contentRect.width);
        });

        observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, [index]); // スライドが切り替わるたびに再監視

    // ✅ 表示判定（例: 画像幅 500px 以下なら下に表示）
    const isNarrow = imageWidth < 500;

    // 自動再生の設定
    const AUTOPLAY = 5000; // 10秒ごとに切り替え
    const AUTOPLAY_PAUSE = 10000; // ユーザー操作後に再開するまでの待機時間
    const [isPaused, setIsPaused] = useState(false);
    const resumeTimer = useRef<NodeJS.Timeout | null>(null); // タイマーIDを保持
    useEffect(()=>{
        if (crousels.length <= 1 || isPaused) return; // 画像が1枚以下なら自動再生しない

        const interval = setInterval(next, AUTOPLAY);
        return () => clearInterval(interval);
    }, [crousels.length, isPaused]);

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
            {/* スライド全体 */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {crousels.map((crousel, i) => (
                    <div key={i} className="w-full flex-shrink-0 relative">
                        <img
                            ref={i === index ? imageRef : null} // ✅ 現在のスライドのみ監視
                            src={crousel.image}
                            alt={crousel.caption}
                            className="w-full max-h-[250px] md:max-h-[300px] lg:max-h-[400px] object-cover"
                        />
                        {/* ✅ 幅に応じて切り替え */}
                        {!isNarrow && (
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm md:text-base px-3 py-1 rounded-md">
                                {crousel.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ナビゲーション */}
            {crousels.length > 1 && (
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
                        {crousels.map((_, i) => (
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
            {/* ✅ 幅が狭いときは画像の下に表示 */}
            {isNarrow && crousels[index]?.caption && (
                <div className="mt-2 text-center text-sm md:text-base text-gray-700">
                    {crousels[index].caption}
                </div>
            )}
        </div>
    );
}
