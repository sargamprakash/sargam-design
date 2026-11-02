import React from "react";
import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" prefetch={false} aria-label="sargam.design home">
      <svg
        className="brand-mark"
        viewBox="32 12 64 104"
        aria-hidden="true"
        focusable="false"
      >
        <image
          className="mark-light"
          href="/brand/monogram-black.svg"
          width="128"
          height="128"
        />
        <image
          className="mark-dark"
          href="/brand/monogram-white.svg"
          width="128"
          height="128"
        />
      </svg>
      <span className="wordmark">
        sargam<wbr /><span className="wordmark-dot">.</span>design
      </span>
    </Link>
  );
}
