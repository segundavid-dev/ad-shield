import { createContext } from "react";
import type { toggleSwitchProps } from "@/types";

export const SwitchContext = createContext<toggleSwitchProps | undefined>(
  undefined
);
