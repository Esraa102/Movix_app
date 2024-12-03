import { Search } from "lucide-react";

export const usernameRegx = /^[a-zA-Z0-9]{3,20}$/;

export const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;

export const errorMessages = {
  required_field: "This field is required",
  username_field: "Username should be more than 8 chars and less than 20 chars",
  email_field: "Please enter valid email",
  password_field:
    "Password Should contains 1 uppercase, 1 lowercase, 1 number,more than 8, less than 12",
};

export const baseUrl = "http://localhost:5000/api/v1";

export const toastStyle = {
  position: "top-left",
  style: {
    background: "#0b0a0a",
    color: "#fff",
    border: "1px solid #aaa",
    fontSize: "16px",
  },
};

export const navLinks = [
  { name: "TV Shows", link: "/tv-shows" },
  { name: "Movies", link: "/movies" },
  { name: <Search size={26} strokeWidth={2.5} />, link: "/search" },
];

export const imageBaseURL = "https://image.tmdb.org/t/p/original";

export const movies_categories = [
  "now_playing",
  "top_rated",
  "popular",
  "upcoming",
];
export const tvs_categories = [
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
];
