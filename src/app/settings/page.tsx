import "./style.css";

export default function PageInDevelopment() {
  return (
    <div
      style={{ minHeight: "85vh", marginRight: "230px", textAlign: "center" }}
    >
      <div>Ожидайте, страница настроек в разработке.</div>
      <div className="pendulum">
        <div className="pendulum_box">
          <div className="ball first"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball last"></div>
        </div>
      </div>
    </div>
  );
}
