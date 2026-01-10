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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ShieldCheck size={64} />
        <h1>AD-SHIELD</h1>
      </div>
    </div>
  );
}
