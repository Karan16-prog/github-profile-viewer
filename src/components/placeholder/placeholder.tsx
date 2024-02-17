const Placeholder = ({ url }: { url: string }) => {
  const navigateTo = `${url}profile?username=Karan16-prog`;
  return (
    <div className="placeholder-container">
      <div style={{ textAlign: "center" }}>
        <div className="placeholder-title">
          <h2>Stalk Insta ❌</h2>
          <h2>Stalk Github ✅</h2>
        </div>
        <div>
          Format:
          <a style={{ textDecoration: "none" }} href={navigateTo}>
            &nbsp; {navigateTo}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
