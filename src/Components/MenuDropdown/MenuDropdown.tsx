import * as React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import {
  StyledMenuWrapper,
  StyledMenu,
  StyledMenuButton,
  StyledMenuItem,
} from "./styles";
import { useLocation } from "react-router-dom";
import * as IconGallery from "@iconsGallery";
import * as PageConfiguration from "@pageConfiguration";
import * as Utils from "@utils";
import * as GlobalFixture from "@globalFixture";
import { Authentication } from "../Authentication";
import { defaultMenuList } from "./fixture";
const { IS_AUTHENTICATED } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const MenuDropdown = (props: any) => {
  const {
    onClickMenu = () => "",
    onHandleMenuItm = () => "",
    menuList = [],
    isAuthenticated = false,
    setIsAuthenticated = () => false,
  } = props as any;
  const [anchorEl, setAnchorEl] = React.useState<null>(null);
  const open = Boolean(anchorEl);
  const locationKit = useLocation();
  const { pathname = "" } = locationKit || {};
  const handleClick = (event: any) => {
    localStorage.removeItem(IS_AUTHENTICATED);
    setIsAuthenticated(false);
    setAnchorEl(event.currentTarget);
    onClickMenu(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem(IS_AUTHENTICATED);
    setIsAuthenticated(false);
  };
  const dropDownList =
    menuList && menuList.length > 0 ? menuList : defaultMenuList;
  const showMenuDetails =
    isAuthenticated || localStorage.getItem(IS_AUTHENTICATED) === "true";
  const { transactionId = "" } = Utils?.getStorage() || {};
  const isMenuDisabled = pathname === PageConfiguration?.pathParams?.transaction ||
    transactionId !== ""
  return (
    <StyledMenuWrapper>
      <StyledMenuButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : "short-menu"}
        aria-expanded={open ? "true" : "false"}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={isMenuDisabled}
      >
        <IconButton
          disabled={isMenuDisabled}
        >
          <IconGallery.IMenuIcon className="cls-menu-icon" />
        </IconButton>
      </StyledMenuButton>
      <StyledMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {!showMenuDetails || showMenuDetails === null ? (
          <Authentication
            setIsAuthenticated={setIsAuthenticated}
            onClose={handleClose}
          />
        ) : (
          dropDownList &&
          dropDownList.map((itm: any, index: any) => {
            const { disabled = false, showOption = true } = itm;
            const IconKit = itm?.icon;
            return (
              <Grid key={index}>
                {disabled || !showOption ? (
                  <></>
                ) : (
                  <StyledMenuItem
                    onClick={() => {
                      handleClose();
                      onHandleMenuItm(itm);
                    }}
                    className="cls-itm-container"
                  >
                    <IconKit className={`cls-icon-itm-kit`} />
                    <Typography className={"cls-itm-name"}>
                      {itm?.name}
                    </Typography>
                  </StyledMenuItem>
                )}
              </Grid>
            );
          })
        )}
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

export default MenuDropdown;
export { MenuDropdown };
