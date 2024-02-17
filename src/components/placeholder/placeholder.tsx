const Placeholder = () => {
  return (
    <div className="placeholder-container">
      <div style={{ textAlign: "center" }}>
        <div className="placeholder-title">
          <h2>Stalk Insta ❌</h2>
          <h2>Stalk Github ✅</h2>
        </div>
        <div>
          Format:
          <a
            style={{ textDecoration: "none" }}
            href="http://localhost:5173/profile?username=Karan16-prog"
          >
            &nbsp; "http://localhost:5173/profile?username=Karan16-prog"
          </a>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
