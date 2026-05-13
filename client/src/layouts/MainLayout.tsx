import React from "react";
import { ComingSoonModal } from "../components/common/ComingSoonModal";

import { AppToaster } from "../components/common/AppToaster";
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  //const currentYear = new Date().getFullYear();

  return (
    <div>
      <main>{children}</main>
      <ComingSoonModal />
      <AppToaster />
      {/*<footer>
        <p>© {currentYear} My App. All rights reserved.</p>
      </footer>*/}
    </div>
  );
};

export default MainLayout;
