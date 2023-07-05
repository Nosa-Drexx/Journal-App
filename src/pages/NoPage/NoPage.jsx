import { Link } from "react-router-dom";
import JournalImage from "../../images/Journal-text.png";

function NoPage() {
  return (
    <div>
      <div className="NoPageLogo">
        <Link to="/">
          <img
            src={JournalImage}
            alt="Link to Home Page"
            className="NoLogo"
          ></img>
        </Link>
      </div>
      <div className="Nopage">
        <div>
          <h1>404</h1>
          <p>You are trying to access a page that does not exist</p>
        </div>
      </div>
    </div>
  );
}
export default NoPage;
