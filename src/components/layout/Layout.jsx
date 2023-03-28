import React from "react";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title> Socials | Dashboard </title>
        <meta name="description" content="Socials made by Andrew Hilario" />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
