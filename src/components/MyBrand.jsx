import { Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import logo from "/XMLID 1.png";
import roofIcon from "/icons8-roof-100.png";

function MyBrand() {
  return (
    <Stack
      component={RouterLink}
      to="/"
      direction="row"
      alignItems="end"
      sx={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
      className="gap-2 sm:gap-2 md:gap-3"
      aria-label="Yangi Uy - Home"
    >
      {/* Logo */}
      <img
        src={logo}
        alt=""
        className="w-9 sm:w-10 md:w-12 lg:w-[52px] h-auto"
      />

      {/* Wordmark */}
      <div className="leading-none">
        <span className="font-semibold align-bottom text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]">
          Yangi
        </span>

        <span className="relative inline-block align-bottom ml-1.5 sm:ml-2 rounded bg-[#0E7C86] text-white">
          {/* Roof icon above the badge (size/offset responsive) */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 -top-5 sm:-top-6 md:-top-4 pointer-events-none"
          >
            <img
              src={roofIcon}
              alt=""
              className="w-5 sm:w-6 md:w-7 lg:w-15 h-auto"
            />
          </span>

          {/* Badge text */}
          <span className="inline-block px-1.5 py-0.5 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
            Uy
          </span>
        </span>
      </div>
    </Stack>
  );
}

export default MyBrand;
