import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import arrowLeft from "/arrow-left.png";
import arrowRight from "/arrow-right.png";

import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import VillaIcon from "@mui/icons-material/Villa";
import { useTranslation } from "react-i18next";

export default function CategorySlider() {
  const { t } = useTranslation("common");
  const sliderRef = useRef(null);

  const categories = [
    { id: "house", title: t("house") || "House", image: "/unsplash_5q1KnUjtjaM.png", Icon: HouseIcon },
    { id: "apartment", title: t("apartment") || "Apartment", image: "/unsplash_ZtC4_rPCRXA.png", Icon: ApartmentIcon },
    { id: "office", title: t("office") || "Office", image: "/unsplash_ZtC4_rPCRXA.png", Icon: BusinessIcon },
    { id: "villa", title: t("villa") || "Villa", image: "/unsplash_b_79nOqf95I.png", Icon: VillaIcon },
  ];

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative w-full py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">{t("category") || "Category"}</h2>
      <p className="text-center text-slate-500 mt-3 max-w-2xl mx-auto">
        {t("categorySubtitle") || "Nulla quis curabitur velit volutpat auctor bibendum consectetur sit."}
      </p>

      <div className="container mx-auto px-4 mt-10">
        <Slider ref={sliderRef} {...settings}>
          {categories.map(({ id, title, image, Icon }) => (
            <div key={id} className="px-3">
              <div className="relative h-72 md:h-100 rounded-xl overflow-hidden border border-slate-200 shadow-md">

                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/40 hover:bg-black/35 transition-colors"></div>

                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-4 text-white">
                    <Icon sx={{ fontSize: 56, color: "white" }} />
                    <span className="text-lg md:text-xl font-semibold">{title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <button
        type="button"
        onClick={() => sliderRef.current?.slickPrev()}
        className="arrow left-6"
        aria-label="Previous"
      >
        <img src={arrowLeft} alt="" className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={() => sliderRef.current?.slickNext()}
        className="arrow right-6"
        aria-label="Next"
      >
        <img src={arrowRight} alt="" className="w-6 h-6" />
      </button>
    </section>
  );
}
