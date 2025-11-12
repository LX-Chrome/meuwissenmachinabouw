import React, {useEffect, useState} from 'react';

const ImageSlider = ({images}: { images: string[] }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        setIsAnimated(true);
    }, [isClient]);

    return (
        <div
            className={`slider ${isAnimated ? 'overflow-hidden' : ''}`}
        >
            <div
                className="flex items-center h-full animate-scroll"
                style={{
                    width: 'max-content',
                }}
            >
                {[...images, ...images, ...images].map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="flex-shrink-0 h-[4.2vh] object-contain mx-3 opacity-90 hover:opacity-100 transition-opacity duration-300 rounded"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
