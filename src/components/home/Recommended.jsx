import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import arrowLeft from "/arrow-left.png";
import arrowRight from "/arrow-right.png";


import { useTranslation } from "react-i18next";
import Amenity from "./AmenityInfos";
import ListingCard from "../listing/ListingCard";
import apartments from "../../lib/listings";

const slides = [
    "/2166569c025784029df0a6b745e6bcb400f1a436.jpg",
    "/images (1).png",
    "/images.png",
];

export default function RecommendedSlider() {
    const { t } = useTranslation("common");
    const sliderRef = useRef(null);

    const items = slides.map((src, i) => ({ src, ...(apartments[i] ?? {}) }));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="relative w-full py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                {t("recommended") || "Recommended"}
            </h2>

            <div className="container mx-auto px-4">
                <Slider ref={sliderRef} {...settings}>
                    {items.map((item, i) => (
                        <ListingCard prop={{item, i}}/>
                    ))}
                </Slider>
            </div>

            {/* external arrows */}
            <button
                type="button"
                onClick={() => sliderRef.current?.slickPrev()}
                className="arrow left-4"
                aria-label="Previous slide"
            >
                <img src={arrowLeft} alt="" className="w-6 h-6" />
            </button>

            <button
                type="button"
                onClick={() => sliderRef.current?.slickNext()}
                className="arrow right-4"
                aria-label="Next slide"
            >
                <img src={arrowRight} alt="" className="w-6 h-6" />
            </button>
        </section>
    );
}
