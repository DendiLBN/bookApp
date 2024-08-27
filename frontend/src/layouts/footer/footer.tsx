import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export const LandingPageFooter: React.FC = () => (
  <Footer
    style={{
      textAlign: "center",
      width: "100%",
    }}
  >
    Book Store
  </Footer>
);

export default LandingPageFooter;
