import { useEffect, useState } from "react";
import { SwitchContext } from "./SwitchContext";

export function SwitchProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  if (enabled) {
    console.log("active");
  } else {
    console.log("inactive");
  }

  // load from storage on mount
  useEffect(() => {
    if (typeof browser !== "undefined" && browser.storage) {
      browser.storage.local.get("blockerEnabled").then((res) => {
        if (typeof res.blockerEnabled === "boolean") {
          setEnabled(res.blockerEnabled);
        }
      });
    }
  }, []);

  // save to storage whenever it changes
  useEffect(() => {
    if (typeof browser !== "undefined" && browser.storage) {
      browser.storage.local.set({ blockerEnabled: enabled });
    }
  }, [enabled]);

  const onChange = (value: boolean) => setEnabled(value);

  return (
    <SwitchContext.Provider value={{ enabled, onChange, setEnabled }}>
      {children}
    </SwitchContext.Provider>
  );
}
