/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/icons";

type CarouselItem = {
    id: number | string;
    content: React.ReactNode;
};

interface CarouselProps {
    items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1,
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1,
        );
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rtl">
            {/* Carousel Wrapper */}
            <ul
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(${currentIndex * 100}%)`, // برای راست به چپ
                    direction: "rtl",
                }}
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="w-full flex-shrink-0 flex justify-center items-center p-4"
                    >
                        {item.content}
                    </div>
                ))}
            </ul>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-grayDark border-1 border-zinc-700 text-white p-2 rounded-full shadow-md hover:bg-zinc-700 transition-all duration-200"
            >
                <ArrowRightIcon />
            </button>
            <button
                onClick={handleNext}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-grayDark border-1 border-zinc-700 text-white p-2 rounded-full shadow-md hover:bg-zinc-700 transition-all duration-200"
            >
                <ArrowLeftIcon />
            </button>

            {/* Info Box */}
            <div className="absolute bottom-[14.5rem] right-1/2 transform translate-x-1/2 bg-grayDark border-1 border-zinc-700 text-white py-1 px-3 rounded-full p-2 text-sm shadow-2xl">
                {currentIndex + 1} از {items.length}
            </div>
        </div>
    );
};

export default Carousel;
