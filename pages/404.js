import Link from "next/link";

const NotFound = () => (
  <div className="error-page">
    <h1 className="error-page-h1"> 404 </h1>
    <h2 className="error-page-h2">Not found!</h2>
    <span></span>
    <p>Sorry,we can't find what you're looking for.</p>
    <Link href={`/pokedex`} role="link">
      <button className="go-back-home-btn" role="button">
        Go back home
      </button>
    </Link>
  </div>
);

export default NotFound;
