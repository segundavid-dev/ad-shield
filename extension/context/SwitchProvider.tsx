import { useEffect, useRef, useState } from "react";
import { SwitchContext } from "./SwitchContext";

export function SwitchProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const initialized = useRef(false);

  // load from storage on mount
  useEffect(() => {
    if (typeof browser !== "undefined" && browser.storage) {
      browser.storage.local.get("blockerEnabled").then((res) => {
        if (typeof res.blockerEnabled === "boolean") {
          setEnabled(res.blockerEnabled);
        }
        initialized.current = true;
      });
    } else {
      initialized.current = true;
    }
  }, []);

  // save to storage only after initial load to avoid overwriting persisted state
  useEffect(() => {
    if (!initialized.current) return;
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
