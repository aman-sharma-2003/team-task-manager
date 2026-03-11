import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const cn = (...input) => {
  return twMerge(clsx(input));
};
