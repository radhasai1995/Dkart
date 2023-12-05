import { styled } from "@mui/material/styles";
import { Menu, Grid, IconButton, MenuItem } from "@mui/material";

export const StyledMenuWrapper = styled(Grid)`
  .cls-menu-icon {
    width: 36px;
    height: 36px;
  }
  @media screen and (min-width: 100px) and (max-width: 1200px) {
  }
`;
export const StyledMenu = styled(Menu)`
  &.MuiMenu-list {
    background: var(--white);
  }

  ul {
    width: 390px;
  }
  @media screen and (min-width: 100px) and (max-width: 1200px) {
  }
`;
export const StyledMenuButton = styled(IconButton)`
  @media screen and (min-width: 100px) and (max-width: 1200px) {
  }
`;
export const StyledMenuItem = styled(MenuItem)`
  &.cls-itm-container {
    background: var(--white);
    min-height: 45px;
    height: 60px;
    border-bottom: 1px dashed #959595;
    padding: 10px;
  }

  .cls-itm-icon-container {
    margin-right: 10px;
  }
  svg.cls-icon-itm-kit {
    margin-right: 20px;
    margin-left: 10px;
    color: var(--lightRose);
  }

  .cls-itm-name-red,
  .cls-itm-name {
    font-weight: normal;
    font-size: 16px;
    color: var(--black);
  }
  @media screen and (min-width: 100px) and (max-width: 1200px) {
  }
`;
