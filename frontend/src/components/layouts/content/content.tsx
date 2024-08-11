import { Layout } from "antd";
import "@/assets/styles/global/content.css";
import { LandingPageRouting } from "components/routing/routing";

const { Content } = Layout;

export const LandingPageContent = () => {
  return (
    <Content className="landing__page-content">
      <LandingPageRouting />
    </Content>
  );
};
