import { Grid, Typography, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as PageConfiguration from "@pageConfiguration";
import * as ComponentsLib from "@componentLib";
import * as GlobalFixture from "@globalFixture";
import * as IconGallery from "@iconsGallery";
import { AppHeaderContext } from "./AppHeaderContext";
import { useAppHeaderState } from "./useAppHeaderState";
import { useAppHeaderFixture } from "./fixture";
import * as Utils from "@utils";
import {
  StyledAppBarWrapper,
  StyledAppBarLeftContainer,
  StyledAppBarRightContainer,
} from "./styles";
const {
  TRAINING,
  REPORTS,
  USERS,
  PROFILE,
  LOGOUT,
} = GlobalFixture.TOTAL_CONTENTS;
const {
  API_SUCCESS_STATUS,
} = GlobalFixture.API_FIXTURE_CONTENTS;
const {
  IS_AUTHENTICATED,
  PAYMENT_GATEWAY,
  TRANSACTION_ID
} = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const {
  HEARTLAND_GATEWAY,
  DEFAULT_HEARTLAND_INIT_STATUS,
  HEARTLAND_INIT_FAIL,
  STRIPE_GATEWAY,
  DEFAULT_STRIPE_INIT_STATUS,
  STRIPE_INIT_FAIL,
} = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;
const {
  APP_LOGO_IMG
} = GlobalFixture.MEDIA_FIXTURE_CONTENTS;
function AppHeader(props: any) {
  const { userName = "", } = Utils?.getStorage() || {};
  const locationKit = useLocation();
  const { pathname = "" } = locationKit || {};
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isConfimationModalOpen = false,
    confimationModalTitle = "",
    confimationModalSubTitle = "",
    onHandleCloseModal = () => "",
    onHandleClickModalSuccess = () => "",
    onHandleClickModalFail = () => "",
    setConfirmatinModalTitle,
    setConfirmatinModalSubTitle,
    onHandleOpenModal,
    getDateTime,
    isLogoutLoading,
    menuList = [],
    setMenuList = () => "",
    hasPermission = () => "",
    isMenuLoading = false,
    doGetPaymentGateway = () => "",
    globalAppStates = () => ""
  } = useAppHeaderState({ pageConfiguration: PageConfiguration, navigate });
  const {
    doChoosePaymentDefaultAPI = () => "",
    getPaymentType = "",
    setIsHeartLandConnectorModalOpen,
    isAuthenticated = false,
    setIpAddress = () => "",
    setIpAddressValid = () => false,
    setIsAuthenticated = () => false,
    heartLandPaxIntializeStatus = "",
    getIsIP_Valid = () => "",
    setIsConnectReaderModalOpen = () => false,
    setIsDiscoverReaderModalOpen = () => false,
    connectorReaderIntializedStatus = "",
    doCloseTheTransaction = () => ""
  } = globalAppStates as any;
  const { defaultMenuList = [] } = useAppHeaderFixture();

  const { date = "", time = "" } = getDateTime;
  const onTriggerMenu = () => {
    let finalMenuList = [];
    finalMenuList =
      defaultMenuList.map((itm: any) => {
        const { requiredPermission = "" } = itm || {};
        let showMenu = hasPermission({ field: requiredPermission });
        return { ...itm, showOption: showMenu };
      }) || [];
    setMenuList(finalMenuList);

  };
  const onHandleMenuItm = (itm: any) => {
    const { id = "" } = itm;
    switch (id) {
      case LOGOUT:
        let prefixModalTitle = t("HI");
        setConfirmatinModalTitle(`${prefixModalTitle}, ${userName}`);
        let subTitle = t("LOGOUT_CONFIRMATION");
        setConfirmatinModalSubTitle(subTitle);
        onHandleOpenModal();
        break;
      case TRAINING:
        navigate(PageConfiguration?.pathParams?.products);
        break;
      case REPORTS:
        navigate(PageConfiguration?.pathParams?.report);
        break;
      case USERS:
        navigate(PageConfiguration?.pathParams?.users);
        break;
      case PROFILE:
        navigate(PageConfiguration?.pathParams?.profile);
        break;
      default:
        break;
    }
  };
  const onHandleClickHome = () => {
    const { transactionId = "" } = Utils?.getStorage() || {};
    localStorage.removeItem(IS_AUTHENTICATED);
    setIsAuthenticated(false);
    if (transactionId)
      doCloseTheTransaction({
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps;
          if (status === API_SUCCESS_STATUS) {
            localStorage.setItem(TRANSACTION_ID, "");
            navigate(PageConfiguration?.pathParams?.home);
          }
        },
      })
    else {
      navigate(PageConfiguration?.pathParams?.home);
    }

    // if (!transactionId) {
    //   navigate(PageConfiguration?.pathParams?.home);
    // } else {
    //   navigate(PageConfiguration?.pathParams?.cart);
    // }
  };
  const confirmationModalProps = {
    open: isConfimationModalOpen,
    handleClose: onHandleCloseModal,
    modalTitle: confimationModalTitle,
    modalsubTitle: confimationModalSubTitle,
    onsuccess: onHandleClickModalSuccess,
    onfail: onHandleClickModalFail,
    cancelTxt: t("LOGOUT_CANCEL"),
    confirmTxt: t("LOGOUT_PROCEED"),
    confirmLoaderTxt: t("LOGIN_BUTTON_TEXT_LOADING"),
    isSuccessButtonLoading: isLogoutLoading,
  };

  if (pathname === "/" || pathname === PageConfiguration?.pathParams?.login) {
    return <></>;
  } else {
    return (
      <StyledAppBarWrapper>
        <StyledAppBarLeftContainer className="cls-app-bar-left-container">
          <img
            className="cls-header-image"
            src={APP_LOGO_IMG}
          />
        </StyledAppBarLeftContainer>
        <StyledAppBarRightContainer className="cls-app-bar-right-container">
          <Grid className="cls-app-bar-right-icons cls-app-bar-right-action-icons">
            <IconButton
              onClick={() => {
                if (getPaymentType) {
                  localStorage.removeItem(IS_AUTHENTICATED);
                  setIsAuthenticated(false);
                  setTimeout(() => {
                    if (getPaymentType === HEARTLAND_GATEWAY) {
                      setIsHeartLandConnectorModalOpen(true);
                    } else {
                      setIsConnectReaderModalOpen(true);
                    }
                  }, 500)
                }
                else {
                  doChoosePaymentDefaultAPI({
                    cbk: (innerProps: any) => {
                      const { status = "", payType = HEARTLAND_GATEWAY } = innerProps;
                      const { heartLandIpAddress = "" } = Utils.getStorage() || {};
                      let ipAddressValue = heartLandIpAddress || "";
                      setIpAddress(ipAddressValue);
                      let isValidIP = getIsIP_Valid(ipAddressValue);
                      setIpAddressValid(isValidIP);
                      if (status === API_SUCCESS_STATUS) {
                        localStorage.setItem(PAYMENT_GATEWAY, payType);
                        doGetPaymentGateway({ paymentGatewayType: payType })
                      } else {
                        /** do necessary action */
                      }
                    },
                  });

                }
              }}
            >
              {[HEARTLAND_INIT_FAIL, DEFAULT_HEARTLAND_INIT_STATUS].includes(heartLandPaxIntializeStatus) &&
                [STRIPE_INIT_FAIL, DEFAULT_STRIPE_INIT_STATUS].includes(connectorReaderIntializedStatus) ? (
                <IconGallery.DollarIconOFF className="cls-menu-icon" />
              ) : (
                <IconGallery.DollarIconON className="cls-menu-icon" />
              )}
            </IconButton>
          </Grid>
          <Typography className="cls-app-bar-date-time">{`|`}</Typography>
          <Grid className="cls-app-bar-right-icons">
            <Typography className="cls-app-bar-date-time">{date}</Typography>
            <Typography className="cls-app-bar-date-time">{time}</Typography>
          </Grid>
          <Typography className="cls-app-bar-date-time">{`|`}</Typography>
          <Grid className="cls-app-bar-right-icons cls-app-bar-right-action-icons">
            <IconButton
              onClick={onHandleClickHome}
            // disabled={
            //   pathname === PageConfiguration?.pathParams?.transaction ||
            //   Utils?.getStorage()?.transactionId !== ""
            // }
            // disabled={pathname === PageConfiguration?.pathParams?.transaction}
            >
              <IconGallery.IHomeIcon className="cls-menu-icon" />
            </IconButton>
            <ComponentsLib.MenuDropdown
              onClickMenu={onTriggerMenu}
              onHandleMenuItm={onHandleMenuItm}
              menuList={menuList}
              isMenuLoading={isMenuLoading}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          </Grid>
        </StyledAppBarRightContainer>
        <ComponentsLib.ConfirmationModal {...confirmationModalProps} />
      </StyledAppBarWrapper>
    );
  }
}

export default AppHeader;
export { AppHeader, AppHeaderContext, useAppHeaderState };
