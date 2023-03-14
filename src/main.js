import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import "./styles/global.css";
import router from "./router";

// svgIcon
import SvgIcon from "@/components/SvgIcon.vue";

import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Menu,
  MenuItem,
  Result,
  Button,
  Space,
  Input,
  InputSearch,
  Row,
  Col,
  Avatar,
  Dropdown,
  MenuDivider,
  Tabs,
  TabPane,
  Tag,
  Card,
  CardGrid,
  Image,
} from "ant-design-vue";

createApp(App)
  .use(router)
  .use(Layout)
  .use(LayoutHeader)
  .use(LayoutContent)
  .use(LayoutFooter)
  .use(Menu)
  .use(MenuItem)
  .use(Result)
  .use(Button)
  .use(Space)
  .use(Input)
  .use(InputSearch)
  .use(Row)
  .use(Col)
  .use(Avatar)
  .use(Dropdown)
  .use(MenuDivider)
  .use(Tabs)
  .use(TabPane)
  .use(Tag)
  .use(Card)
  .use(CardGrid)
  .use(Image)
  .component("svg-icon", SvgIcon)
  .mount("#app");

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
/**
 * require.context是什么？
 * 一个webpack的api,通过执行require.context函数获取一个特定的上下文,
 * 主要用来实现自动化导入模块（遍历文件夹的文件，从中获取指定文件，自动导入模块）
 * 在前端工程中,一个文件夹中的模块需要频繁引用时可以使用该中方式一次性引入
 * 可以使用这个api,它会遍历文件夹中的指定文件,
 * 然后自动导入,使得不需要每次显式的调用import导入模块
 */
const req = require.context("@/assets/icons", false, /\.svg$/);
// 加载目录下的所有 svg 文件
requireAll(req);
