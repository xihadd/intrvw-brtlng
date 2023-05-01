import Link from "next/link";
import React from "react";

import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const router = useRouter();
  const { asPath } = router;

  const homeCrumb = (
      <Link href={"/"} key={-1}>
        Home
      </Link>
  );

  const segments = asPath.split("/").filter((segment) => segment !== "");
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const friendlyName = segment.replace(/-/g, " ");
    return (
      <>
        <span className="text-yellow-400 mx-1">&#62;</span>
        <Link href={href} key={index} className="capitalize">
          {friendlyName}
        </Link>
      </>
    );
  });

  return (
    <nav>
      {homeCrumb}
      {crumbs}
    </nav>
  );
};

export default Breadcrumbs;
