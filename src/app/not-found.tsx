import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <div className="container">
        <h1 className="page-title">This page isn&apos;t here.</h1>
        <p className="intro-copy">
          The link may be out of date. Your projects are back at home.
        </p>
        <Link className="primary-link" href="/" prefetch={false}>
          Back to projects
        </Link>
      </div>
    </main>
  );
}
