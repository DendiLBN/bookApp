import React from "react";
import { Layout, Input, Button, Space } from "antd";

const { Footer } = Layout;

export const LandingPageFooter: React.FC = () => (
  <Footer
    style={{
      textAlign: "center",
    }}
  >
    <div style={{ marginBottom: "30px" }}>
      <h3>Subscribe to our Newsletter</h3>
      <Space.Compact style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Input style={{ width: "70%" }} placeholder="Enter your email" />
        <Button type="primary" style={{ width: "30%" }}>
          Subscribe
        </Button>
      </Space.Compact>
    </div>
    <div style={{ marginBottom: "20px" }}>
      <a href="/about" style={{ marginRight: "15px" }}>
        About Us
      </a>
      <a href="/contact" style={{ marginRight: "15px" }}>
        Contact
      </a>
      <a href="/terms" style={{ marginRight: "15px" }}>
        Terms of Service
      </a>
      <a href="/privacy">Privacy Policy</a>
    </div>
    <div style={{ marginTop: "20px", color: "#888" }}>
      © 2024 Book Store. All rights reserved.
    </div>
  </Footer>
);

export default LandingPageFooter;
