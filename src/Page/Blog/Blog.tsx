import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, Button } from "@mui/material";
import * as ComponentLib from "@componentLib";
const ButtonUI = styled(Button)`
  color: var(--white);
  background: var(--lightPink);
`;

const Blog = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Blog</h1>
      {/* <ComponentLib.Dropdown /> */}
      <ButtonUI
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        go
      </ButtonUI>
    </div>
  );
};

export default Blog;
export { Blog };
