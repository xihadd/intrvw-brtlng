import React, { Children } from "react";

import TopNav from "../../components/topnav/topnav";
import Footer from "../../components/footer/footer";

const Layout = (props: any) => {
  const { children } = props;
  return (
    <>
      <TopNav />
      <div className="z-0 bg-gray-100 min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
