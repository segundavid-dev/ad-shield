import { ShieldCheck } from "lucide-react";

export default function OnboardScreen() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        overflow: "hidden",
        backgroundColor: "var(--neo-success)",
      }}
    >
      <div
        className="neo-card"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <ShieldCheck size={80} strokeWidth={3} />
        <h1 style={{ margin: 0, fontSize: "2.5rem", letterSpacing: "-1px" }}>
          AD-SHIELD
        </h1>
      </div>
    </div>
  );
}
