import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Hero_Picture from '/Hero_Picture.jpg'
import arrowLeft from "/arrow-left.png";
import arrowRight from "/arrow-right.png";

const testimonials = [
  {
    id: "t1",
    text:
      "“ I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends “",
    name: "Marvin McKinney",
    role: "Software developer",
    avatar: Hero_Picture,
  },
  {
    id: "t2",
    text:
      "“ I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends “",
    name: "Marvin McKinney",
    role: "Software developer",
    avatar: Hero_Picture,
  },
  {
    id: "t3",
    text:
      "“ I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends “",
    name: "Marvin McKinney",
    role: "Software developer",
    avatar: Hero_Picture,
  },
];

export default function Testimonials() {
  const { t } = useTranslation("common");
  const sliderRef = useRef(null);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-slate-100 to-slate-200/60">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {t("testimonials") || "Testimonials"}
      </h2>
      <p className="text-center text-slate-500 mt-3 max-w-2xl mx-auto">
        {t("testimonialSubtitle") ||
          "Nulla quis curabitur velit volutpat auctor bibendum consectetur sit."}
      </p>

      <div className="container mx-auto px-4 mt-10">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((it) => (
            <div key={it.id} className="px-4">
              <ReviewCard {...it} />
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

function ReviewCard({ text, name, role, avatar }) {
  return (
    <article className="relative flex flex-col items-center text-center">
      <div className="relative bg-white rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-10 md:p-12 min-h-[180px]">
        <p className="text-slate-600 leading-7 md:leading-8 max-w-[560px]">
          {text}
        </p>

        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white ring-4 ring-white shadow overflow-hidden">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="pt-10">
        <h4 className="font-semibold text-slate-900">{name}</h4>
        <p className="text-slate-500">{role}</p>
      </div>
    </article>
  );
}
