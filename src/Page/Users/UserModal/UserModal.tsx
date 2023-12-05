import * as React from "react";
import { useEffect } from "react";
import { useFixtureDetails } from "./fixture";
import { useStyles } from "../styles";
import { renderLeftPanel, renderRightPanel } from "./renderProps";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Typography,
  Dialog,
  DialogContent,
  Grid,
  DialogTitle,
} from "@mui/material";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
import { countryCodesData } from "./../../../Components/PhoneNumberCountryCode/fixture"
const { API_SUCCESS_STATUS } = GlobalFixture.API_FIXTURE_CONTENTS;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserModal = (props: any) => {
  const {
    modalType: type = "",
    openCreateUserModal: openModal = false,
    handleCloseModal = () => "",
    rowDetails = {},
    terminalRoles = [],
    doGetTerminalRoleAccess = () => "",
    doGetIndividualUserDetails = () => "",
    doGetAllTerminalRolesDetails = () => "",
    setTerminalRoles = () => "",
    createUpdateButtonLoader = false,
    t = () => "",
    ...restModalProps
  } = props;
  const {
    userDetailsFixture,
    rowDetailsValue = {},
    setLoadingPermissions = () => "",
    setRolePermissions = () => "",
    setSelectedRole = () => "",
    setRowDetailsValue = () => "",
    setDisableBtn = () => false,
    isDialogModalLoading = false,
    setIsDialogModalLoading = () => false,
    setCountryCode = () => { },
    resetAutoComplete = false,
    setResetAutoComplete = () => false,
    selectedRole = {},
    ...restFixtureProps
  } = useFixtureDetails({ t });
  const classes = useStyles();
  const userModalProps = {
    ...restFixtureProps,
    ...restModalProps,
    selectedRole,
    resetAutoComplete,
    setResetAutoComplete,
    setCountryCode,
    createUpdateButtonLoader,
    type,
    handleCloseModal,
    terminalRoles,
    doGetTerminalRoleAccess,
    userDetailsFixture,
    setDisableBtn,
    setLoadingPermissions,
    setRowDetailsValue,
    setSelectedRole,
    setRolePermissions,
    rowDetailsValue,
    classes,
    t,
  };
  useEffect(() => {
    let roleId = "";
    if (type === "edit") {
      const { keycloakUserId = "" } = rowDetails;
      setIsDialogModalLoading(true);
      setDisableBtn(true);
      doGetIndividualUserDetails({
        userId: keycloakUserId,
        setIsDialogModalLoading,
        cbk: (responseProps: any) => {
          const { status = "", data = {} } = responseProps;
          setIsDialogModalLoading(false);
          if (status === API_SUCCESS_STATUS) {
            const {
              terminalPassword = "",
              role = {},
              terminalKeycloakUserId = "",
            } = data || {};
            setSelectedRole({
              ...role,
              roleId: role?.id,
              roleName: role?.name,
              title: role?.name,
            });

            setRowDetailsValue({
              ...data,
              keycloakUserId: terminalKeycloakUserId,
              pin: terminalPassword,
              confirmPin: terminalPassword,
            });
            const { phoneNumber = {} } = data || {};
            const { countryCode = "", number = "" } = phoneNumber || {};
            const c_code_index = countryCodesData.findIndex(x => x.phone === countryCode);
            if (c_code_index !== -1) {
              let countryCodeObj = countryCodesData[c_code_index];
              setCountryCode({
                code: countryCodeObj?.code,
                label: countryCodeObj?.label,
                phone: countryCodeObj?.phone,
              })
            }
            else {
              setCountryCode({
                code: "US",
                label: "United States",
                phone: "1",
              })
            }
            roleId = role?.id;
            /**
             * terminal roles list dataProps
             */
            let dataProps = {
              searchText: "",
              setTerminalRoles,
              cbk: (responseProps: any) => {
                const { status = "" } = responseProps;

                if (status === API_SUCCESS_STATUS) {
                  setIsDialogModalLoading(false);
                } else {
                  /** do neccessary action */
                }
              },
            };
            doGetAllTerminalRolesDetails(dataProps);
          } else {
            /**
             * do necessary action
             */
          }
        },
      });
    } else {
      setIsDialogModalLoading(true);
      const [_firstRole = {}] = terminalRoles || [];
      setSelectedRole(_firstRole);
      setRowDetailsValue({
        ...userDetailsFixture,
        role: { id: _firstRole?.roleId, name: _firstRole?.roleName },
      });
      roleId = _firstRole?.roleId;
      /**
       * terminal roles list dataProps
       */
      let dataProps = {
        searchText: "",
        setTerminalRoles,
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps;
          if (status === API_SUCCESS_STATUS) {
            setIsDialogModalLoading(false);
          } else {
            /** do neccessary action */
          }
        },
      };
      doGetAllTerminalRolesDetails(dataProps);
    }

  }, [type]);
  useEffect(() => {

    setResetAutoComplete(!resetAutoComplete);
    setLoadingPermissions(true);
    const { id = "" } = selectedRole as any || {};
    if (id) {
      doGetTerminalRoleAccess({
        roleId: id || "",
        setRolePermissions,
        setLoadingPermissions,
      });
    }
  }, [selectedRole])
  return (
    <>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle sx={{ background: "var(--white)", color: "var(--primaryColor)" }}>
          <Typography variant="h5">
            {type !== "edit"
              ? t("CREATE_USER_MODAL_TITLE")
              : t("UPDATE_USER_MODAL_TITLE")}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ minHeight: "55vh", background: "var(--white)", color: "var(--black)" }}
        >
          {isDialogModalLoading ? (
            <IconGallery.CircleLoading />
          ) : (
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item xs={6}>
                {renderLeftPanel(userModalProps)}
              </Grid>
              <Grid item xs={6}>
                {renderRightPanel(userModalProps)}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export { UserModal };
export default UserModal;
