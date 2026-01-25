import type { toggleSwitchProps } from "@/types";

export default function ToggleSwitch({ enabled, onChange }: toggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "60px",
        height: "30px",
        borderRadius: "0px",
        border: "3px solid #000",
        cursor: "pointer",
        backgroundColor: enabled ? "var(--neo-success)" : "#fff",
        boxShadow: "2px 2px 0px #000",
        transition: "all 0.1s",
        padding: 0,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "#000",
          transform: enabled ? "translateX(31px)" : "translateX(3px)",
          transition: "transform 0.1s ease-in-out",
          position: "relative",
        }}
      ></div>
    </button>
  );
}
