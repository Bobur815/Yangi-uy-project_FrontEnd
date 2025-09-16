import React from "react";

import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import MyBrand from "./navbar/MyBrand";

const PHONE = "+998 90 166 27 14";
const ADDRESS = "104-B, Yangi asr street, Fergana, Uzbekistan";
const EMAIL = "example@email.com";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0B1020] text-slate-300">
      {/* Top grid */}
      <div className="container mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <PlaceIcon sx={{ color: "rgba(255,255,255,0.85)" }} />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-start gap-3">
              <LocalPhoneIcon sx={{ color: "rgba(255,255,255,0.85)" }} />
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="hover:text-white"
              >
                {PHONE}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <EmailOutlinedIcon sx={{ color: "rgba(255,255,255,0.85)" }} />
              <a href={`mailto:${EMAIL}`} className="hover:text-white break-all">
                {EMAIL}
              </a>
            </li>
          </ul>

          {/* Socials */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 grid place-items-center rounded-md bg-white/10 hover:bg-white/20"
            >
              <FacebookIcon fontSize="small" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 grid place-items-center rounded-md bg-white/10 hover:bg-white/20"
            >
              <TwitterIcon fontSize="small" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 grid place-items-center rounded-md bg-white hover:text-[#0B1020]"
            >
              <InstagramIcon fontSize="small" className="text-[#0B1020]" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 grid place-items-center rounded-md bg-white/10 hover:bg-white/20"
            >
              <LinkedInIcon fontSize="small" />
            </a>
          </div>
        </div>

        {/* Discover */}
        <div>
          <h4 className="text-white font-semibold mb-6">Discover</h4>
          <ul className="space-y-3">
            <li><a className="hover:text-white" href="#">Chicago</a></li>
            <li><a className="hover:text-white" href="#">Los Angeles</a></li>
            <li><a className="hover:text-white" href="#">Miami</a></li>
            <li><a className="hover:text-white" href="#">New York</a></li>
          </ul>
        </div>

        {/* Lists by Category */}
        <div>
          <h4 className="text-white font-semibold mb-6">Lists by Category</h4>
          <ul className="space-y-3">
            <li><a className="hover:text-white" href="#">Apartments</a></li>
            <li><a className="hover:text-white" href="#">Condos</a></li>
            <li><a className="hover:text-white" href="#">Houses</a></li>
            <li><a className="hover:text-white" href="#">Offices</a></li>
            <li><a className="hover:text-white" href="#">Retail</a></li>
            <li><a className="hover:text-white" href="#">Villas</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-6">Lists by Category</h4>
          <ul className="space-y-3">
            <li><a className="hover:text-white" href="#">About Us</a></li>
            <li><a className="hover:text-white" href="#">Terms &amp; Conditions</a></li>
            <li><a className="hover:text-white" href="#">Support Center</a></li>
            <li><a className="hover:text-white" href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <MyBrand />
          <div className="flex items-center gap-10">

            <p className="text-md text-slate-400">
              Copyright © {new Date().getFullYear()}. All rights reserved.
            </p>

            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="w-10 h-10 grid place-items-center cursor-pointer rounded-md bg-[#6C5CE7] text-white hover:opacity-90"
            >
              <KeyboardArrowUpRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
