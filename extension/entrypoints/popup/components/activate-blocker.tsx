import { useSwitch } from "@/hooks/useSwitch";
import ToggleSwitch from "./toggle-switch";
import { ShieldOff, ShieldCheck } from "lucide-react";

export default function ActivateBlocker() {
  const { enabled, onChange } = useSwitch();

  return (
    <div style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }}>
      {/* Status Card */}
      <div
        className="neo-card"
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          backgroundColor: enabled ? "var(--neo-success)" : "#fff",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          {enabled ? (
            <ShieldCheck size={100} strokeWidth={3} color="#000" />
          ) : (
            <ShieldOff size={100} strokeWidth={3} color="#000" />
          )}
        </div>
        <h2
          style={{
            margin: "0 0 4px 0",
            fontSize: "22px",
            fontWeight: "900",
            textTransform: "uppercase",
          }}
        >
          {enabled ? "Active" : "Disabled"}
        </h2>
        <p style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>
          {enabled ? "PROUDLY PROTECTED" : "YOU ARE VULNERABLE"}
        </p>
      </div>

      {/* Main Toggle Box */}
      <div
        className="neo-box-sm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: "1rem",
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: "800", fontSize: "14px" }}>
            BLOCK ADS / TRACKERS
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <ToggleSwitch enabled={enabled} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
