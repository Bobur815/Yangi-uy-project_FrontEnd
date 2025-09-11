import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from '/arrow-left.png'
import arrowRight from "/arrow-right.png"
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import bedIcon from '/bed.png'
import bathIcon from '/bath.png'
import carIcon from '/car.png'
import rulerIcon from '/ruler.png'




const slides = ["/2166569c025784029df0a6b745e6bcb400f1a436.jpg", "/images (1).png", "/images.png"];

const apartments = [
    {
        "id": "apt-101",
        "title": "Modern 2BR Near City Center",
        "address": "Yunusabad 9-qtr, Tashkent 100093, Uzbekistan",
        "beds": 2,
        "baths": 1,
        "garage": 1,
        "sizeSqft": 860,
        "pricePerMonth": 550
    },
    {
        "id": "apt-102",
        "title": "Spacious 3BR Family Apartment",
        "address": "Farg'ona ko'chasi 12, Fergana 150100, Uzbekistan",
        "beds": 3,
        "baths": 2,
        "garage": 1,
        "sizeSqft": 1240,
        "pricePerMonth": 700
    },
    {
        "id": "apt-103",
        "title": "Cozy 1BR with Park View",
        "address": "Registon ko'chasi 45, Samarkand 140100, Uzbekistan",
        "beds": 1,
        "baths": 1,
        "garage": 0,
        "sizeSqft": 620,
        "pricePerMonth": 400
    }
]

export default function SimpleSlider() {
    const sliderRef = useRef(null);
    const { t } = useTranslation()
    const items = slides.map((src, i) => ({ src, ...(apartments[i] ?? {}) }));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <div className="relative w-full h-72 md:h-[820px] overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
                {items.map((item, i) => (
                    <div key={item.id ?? i}>
                        <div className="relative aspect-[16/6] w-full">
                            <img
                                src={item.src}
                                alt={item.title ?? `slide ${i + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* info overlay */}
                            <div className="absolute inset-x-6 bottom-3 md:inset-x-6 md:bottom-5 ">
                                <div className="rounded-xl bg-black/20 backdrop-blur-sm text-white p-4 mx-[100px] flex flex-col items-center justify-center gap-6">
                                    <div className="min-w-[220px] items-center flex flex-col justify-center gap-4">
                                        <h3 className="text-[60px] font-semibold leading-tight">{item.title}</h3>
                                        <p className="text-[30px] opacity-90">{item.address}</p>
                                    </div>

                                    <div className="flex gap-x-6 gap-y-1 text-[30px]">
                                        <div className="flex flex-col gap-2 items-center ">
                                            <img src={bedIcon} alt="" className="w-6"/>
                                            <span>{item.beds} {t('bed')}{item.beds>1 ? 's' : ""}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center ">
                                            <img src={bathIcon} alt="" className="w-6"/>
                                            <span>{item.baths} {t('bath')}{item.baths>1 ? 's' : ""}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center ">
                                            <img src={carIcon} alt="" className="w-6"/>
                                            <span>{item.garage} {t('garage')}{item.garage>1 ? 's' : ""}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center ">
                                            <img src={rulerIcon} alt="" className="w-6"/>
                                            <span>{item.sizeSqft} ft²</span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="text-[30px] font-bold">${item.pricePerMonth}</div>
                                        <div className="text-[28px] opacity-80">/{t('month')}</div>
                                    </div>
                                    <Button variant="outlined" size="large" color="white" sx={{":hover":{backgroundColor:'#0E7C86'}}}>{t('readMore')}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>



            {/* Prev */}
            <button
                type="button"
                onClick={() => sliderRef.current?.slickPrev()}
                className="arrow left-2"
                aria-label="Previous slide"
            >
                <img src={arrowLeft} alt="" />
            </button>

            {/* Next */}
            <button
                type="button"
                onClick={() => sliderRef.current?.slickNext()}
                className="arrow right-2"
                aria-label="Next slide"
            >
                <img src={arrowRight} alt="" />
            </button>
        </div>
    );
}
