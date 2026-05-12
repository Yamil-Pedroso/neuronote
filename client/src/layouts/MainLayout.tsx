import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  //const currentYear = new Date().getFullYear();

  return (
    <div>
      <main>{children}</main>

      {/*<footer>
        <p>© {currentYear} My App. All rights reserved.</p>
      </footer>*/}
    </div>
  );
};

export default MainLayout;
