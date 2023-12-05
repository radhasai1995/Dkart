import pathParams from "./pathParams";
import * as PageLib from "../Page";

const routesConfig = [
  // {
  //   pagePath: pathParams?.blogs,
  //   pageComponent: PageLib?.Blog,
  // },
  {
    pagePath: pathParams?.login,
    pageComponent: PageLib?.Login,
  },
  {
    pagePath: pathParams?.home,
    pageComponent: PageLib?.Home,
  },
  {
    pagePath: pathParams?.users,
    pageComponent: PageLib?.Users,
  },

  {
    pagePath: pathParams?.cart,
    pageComponent: PageLib?.Cart,
  },
  {
    pagePath: pathParams?.transaction,
    pageComponent: PageLib?.Transaction,
  },
  {
    pagePath: pathParams?.report,
    pageComponent: PageLib?.Report,
  },
  {
    pagePath: pathParams?.products,
    pageComponent: PageLib?.Products,
  },
  {
    pagePath: pathParams?.createproduct,
    pageComponent: PageLib?.CreateProduct,
  },
  {
    pagePath: pathParams?.payment,
    pageComponent: PageLib?.Payment,
  },
  {
    pagePath: pathParams?.profile,
    pageComponent: PageLib?.Profile,
  },
];

export default routesConfig;
export { routesConfig };
