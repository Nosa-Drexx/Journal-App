import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div>
      <div className="NoPageLogo">
        <Link to="/">
          <div className="NoLogo"></div>
        </Link>
      </div>
      <div className="Nopage">
        <div>
          <h1>404</h1>
          <p>You are trying to load a page that does not exist</p>
        </div>
      </div>
    </div>
  );
}
export default NoPage;
