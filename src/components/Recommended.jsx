import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import arrowLeft from "/arrow-left.png";
import arrowRight from "/arrow-right.png";

import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import GarageIcon from '@mui/icons-material/DirectionsCar';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";
import Amenity from "./AmenityInfos";

const slides = [
    "/2166569c025784029df0a6b745e6bcb400f1a436.jpg",
    "/images (1).png",
    "/images.png",
];

const apartments = [
    {
        id: "apt-101",
        title: "New Apartment Nice View",
        address: "Quincy St, Brooklyn, NY, USA",
        beds: 4,
        baths: 5,
        garage: 1,
        sizeSqft: 1200,
        pricePerMonth: 7500,
        oldPrice: 8200,
        tags: ["FEATURED", "FOR SALE"],
    },
    {
        id: "apt-102",
        title: "New Apartment Nice View",
        address: "Quincy St, Brooklyn, NY, USA",
        beds: 4,
        baths: 5,
        garage: 1,
        sizeSqft: 1200,
        pricePerMonth: 7500,
        oldPrice: 8200,
        tags: ["FEATURED", "FOR SALE"],
    },
    {
        id: "apt-103",
        title: "New Apartment Nice View",
        address: "Quincy St, Brooklyn, NY, USA",
        beds: 4,
        baths: 5,
        garage: 1,
        sizeSqft: 1200,
        pricePerMonth: 7500,
        oldPrice: 8200,
        tags: ["FEATURED", "FOR SALE"],
    },
];

export default function RecommendedSlider() {
    const { t } = useTranslation("common");
    const sliderRef = useRef(null);

    // pair each image with an apartment
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
                        <div key={item.id ?? i} className="px-3">
                            <article className="bg-white rounded-2xl shadow-md overflow-hidden">
                                {/* image */}
                                <div className="relative h-56 md:h-64">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* badges */}
                                    <div className="absolute top-3 px-3 flex w-full justify-between gap-2">
                                        {item.tags?.includes("FEATURED") && (
                                            <span className="px-3 py-1 text-xs font-semibold rounded-md text-white bg-indigo-600 shadow">
                                                {t("featured") || "FEATURED"}
                                            </span>
                                        )}
                                        {item.tags?.includes("FOR SALE") && (
                                            <span className="px-3 py-1 text-xs font-semibold rounded-md text-white bg-slate-800 shadow">
                                                {t("forSale") || "FOR SALE"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-white ring-4 ring-white shadow overflow-hidden">
                                        {/* <img src="/agent-1.jpg" alt="" className="w-full h-full object-cover" /> */}
                                    </div>
                                </div>

                                {/* body */}
                                <div className="p-5 pt-8">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.address}</p>

                                    {/* amenities */}
                                    <div className="mt-4 grid grid-cols-4 gap-3 text-slate-700">
                                        <Amenity icon={<BedIcon/>} label={t("bed") || "Beds"} value={item.beds} />
                                        <Amenity icon={<BathtubIcon/>} label={t("bath") || "Baths"} value={item.baths} />
                                        <Amenity icon={<GarageIcon/>} label={t("garage") || "Garage"} value={item.garage} />
                                        <Amenity icon={<SquareFootIcon/>} label="Sq Ft" value={item.sizeSqft} />
                                    </div>

                                    {/* price bar */}
                                    <div className="mt-5 flex items-end justify-between">
                                        <div>
                                            {item.oldPrice && (
                                                <div className="text-xs text-slate-400 line-through">
                                                    ${item.oldPrice.toLocaleString()}/mo
                                                </div>
                                            )}
                                            <div className="text-xl font-bold">
                                                ${item.pricePerMonth.toLocaleString()}/mo
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 hover:scale-110 cursor-pointer transition"
                                                aria-label="Open full"
                                            >
                                                <OpenInFullIcon fontSize="small" />
                                            </button>
                                            <button
                                                className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition"
                                                aria-label="Favorite"
                                            >
                                                <FavoriteBorderIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
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
