import { useContext } from "react";
import { SwitchContext } from "@/context/SwitchContext";

export function useSwitch() {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("useSwitch must be used within SwitchProvider");
  }
  return context;
}
