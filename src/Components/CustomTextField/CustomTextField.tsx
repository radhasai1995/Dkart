import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = (props: any) => {
    const { type = "text", ...restProps } = props || ({} as any);
    return (<TextField></TextField>)
};
export { CustomTextField };
export default CustomTextField;
