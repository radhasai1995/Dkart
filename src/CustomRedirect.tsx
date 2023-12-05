import React from "react";
import { useNavigate } from "react-router-dom";
import * as Utils from "@utils";
import * as PageConfiguration from "@pageConfiguration";
const CustomRedirect = () => {
  // eslint-disable-next-line
  const navigate = useNavigate() as any;
  React.useEffect(() => {
    const { token = "" } = Utils?.getStorage();
    if (token.includes("null")) {
      navigate(PageConfiguration?.pathParams?.login);
    } else {
      const { transactionId = '' } = Utils?.getStorage();
      if (!transactionId) {
        navigate(PageConfiguration?.pathParams?.home);
      }
      else {
        navigate(PageConfiguration?.pathParams?.cart);
      }
    }
  }, []);

  return <span></span>;
};

export default CustomRedirect;

export { CustomRedirect };
