import React from "react";
import Logos from "./logos";
import PagesMenu from "./pagesMenu";
import ActionsMenu from "./actionsMenu";

import { useAppSelector } from "@/store/hooks"; 
import MobileMenu from "./mobileMenu";

const ROUTES: string[] = ["watches", "straps", "stores", "service"];

const TopNav = () => {
  const isMenuOpen = useAppSelector((state) => state.layout.mobileMenuOpen);

  return (
    <div className="bg-white h-16 flex flex-row justify-between sticky top-0 z-20 drop-shadow-sm">
      <Logos />
      <PagesMenu routes={ROUTES} />
      <ActionsMenu />
      {isMenuOpen && <MobileMenu routes={ROUTES} />}
    </div>
  );
};

export default TopNav;
