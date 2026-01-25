import Header from "../components/header";
import ActivateBlocker from "../components/activate-blocker";
import Footer from "../components/footer";

export default function MainScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100%",
        overflow: "hidden",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", width: "100%" }}>
        <ActivateBlocker />
      </div>
      <Footer />
    </div>
  );
}
