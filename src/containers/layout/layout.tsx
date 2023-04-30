import React, { Children } from "react";

import TopNav from "@/components/topnav/topnav";
import Footer from "@/components/footer/footer";
import SearchModal from "@/components/searchModal/searchModal";

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <TopNav />
      <div className="z-0 bg-gray-100 min-h-screen">{children}</div>
      <Footer />
      <SearchModal />
    </>
  );
};

export default Layout;
