import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import popularImg from "/images (1).png";

function PopularHome() {
  const { t } = useTranslation("common");

  return (
    <div className="my-7">
      <div className="relative w-full h-72 md:h-[620px] overflow-hidden">
        <img
          src={popularImg}
          alt={t("PopularTitle") || "Popular"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-black/40 hover:bg-black/35 transition-colors" />

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-6 text-white">
            <h1 className="text-3xl md:text-5xl font-semibold text-center">
              {t("PopularTitle")}
            </h1>
            <Button variant="contained" size="large">
              {t("readMore")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularHome;
