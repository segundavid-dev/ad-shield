export default function Header() {
  return (
    <div
      className="neo-box-sm"
      style={{
        width: "100%",
        textAlign: "center",
        backgroundColor: "var(--neo-warning)",
        marginBottom: "1rem",
        transform: "rotate(-1deg)",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "900",
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "-1px",
        }}
      >
        AD-SHIELD
      </h1>
    </div>
  );
}
