import { MenuProps } from "antd";
import {
  MailOutlined,
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export const itemsSideBar: MenuProps["items"] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Home",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "About",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Pages",
  },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
          },
        ],
      },
    ],
  },
];
