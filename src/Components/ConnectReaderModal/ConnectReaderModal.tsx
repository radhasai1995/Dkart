import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import * as MUI_Material from "@mui/material";
import * as GlobalFixture from "@globalFixture";
import * as IconGallery from "@iconsGallery";
import * as Styles from "./styles";
import { SelectStyles } from "./styles";
import { Authentication } from "../Authentication";

const ConnectReaderModal = (props: any) => {
    const { t } = useTranslation();
    const {
        open: isOpen = false,
        onSubmit = () => "",
        isConnectButtonLoading = false,
        locations = [],
        confirmText = "Regsiter Reader",
        confirmLoaderText = "Connecting....",
        isAuthenticated,
        setIsAuthenticated,
        messageStatus = "",
        onClose = () => "",
        isReaderConnected = false,
    } = props;

    const [registrationCode, setRegistrationCode] = useState<string>("");
    const [registerLocation, setRegisterLocation] = useState<string>("");
    const [isEditLocation, setIsEditLocation] = useState<boolean>(false);
    const [isEditRegCode, setIsEditRegCode] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setRegisterLocation(event.target.value as string);
    };

    useEffect(() => {
        setRegisterLocation(locations?.[0]?.id)
    }, [locations])

    useEffect(() => {
        let mainDom = document?.querySelector("#root") as any;
        if (isOpen) {
            mainDom.classList.add("blur-kit");
            if (messageStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_INIT_SUCCESS) {
                setIsEditLocation(false);
                setIsEditRegCode(false);
            }
        } else {
            mainDom.classList.remove("blur-kit");
        }
        return () => {
            mainDom.classList.remove("blur-kit");
        };

    }, [isOpen]);
    const isThereRegistrationCode = registrationCode && registrationCode.length > 0 ? 1 : 0;
    const isThereRegisterLocation = registerLocation && registerLocation.length > 0 ? 1 : 0;
    const enableConnectButton =
        isThereRegistrationCode && isThereRegisterLocation;


    const handleCreatePayload = () => {
        const label = locations.find(
            (location: any) => location.id === registerLocation
        ).display_name as string;
        return {
            registrationCode: registrationCode,
            label: label,
            locationId: registerLocation,
        };
    };
    const showAuthDetails =
        isAuthenticated || localStorage.getItem(GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED) === "true";
    return (
        <MUI_Material.Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Styles.StyledBox>
                {showAuthDetails ? (<>
                    <Styles.StyledHeader>
                        <MUI_Material.Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="cls-modal-title"
                        >
                            {t("STRIPE_CONFIG_HEADER")}
                        </MUI_Material.Typography>
                        <MUI_Material.Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            className="cls-modal-description"
                        >
                            {t("STRIPE_CONNECTOR_HEADER")}
                        </MUI_Material.Typography>
                        <img src={GlobalFixture.MEDIA_FIXTURE_CONTENTS.PAX_DEVICE_IMG} />
                    </Styles.StyledHeader>
                    <Styles.StyledFormControl fullWidth required>
                        <Styles.StyledInputContainer className="cls-dkph-input-container">
                            <MUI_Material.Typography className={messageStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_INIT_SUCCESS ? "cls-dkph-input-header-340" : "cls-dkph-input-header-295"}>
                                {t("STRIPE_SELECT_FIELD_STORE")}
                            </MUI_Material.Typography>

                            {locations?.length ?
                                <MUI_Material.Grid className="cls-dkph-input-field-wrapper">
                                    <Select
                                        labelId="location-select-label"
                                        id={`location-select${isReaderConnected && !isEditLocation ? "-disabled" : ""}`}
                                        value={registerLocation}
                                        label="Select Store Location"
                                        onChange={handleChange}
                                        defaultValue={locations?.[0]?.id}
                                        sx={{ ...SelectStyles }}
                                        disabled={isReaderConnected && !isEditLocation}
                                    >
                                        {locations && locations.length > 0
                                            ? locations.map((location: any) => {
                                                return (
                                                    <MUI_Material.MenuItem value={location.id} key={location.id}>
                                                        {location.display_name}
                                                    </MUI_Material.MenuItem>
                                                );
                                            })
                                            : null}
                                    </Select>
                                    {isReaderConnected && <MUI_Material.IconButton
                                        onClick={() => setIsEditLocation(!isEditLocation)}
                                    >
                                        {!isEditLocation ? (
                                            <IconGallery.IEditIcon />
                                        ) : (
                                            <IconGallery.ClearIcon />
                                        )}
                                    </MUI_Material.IconButton>}
                                </MUI_Material.Grid> : <MUI_Material.Grid className="cls-dkph-input-field-wrapper">
                                    <MUI_Material.Typography style={{ color: "var(--disableColor)" }}>
                                        {t("STRIPE_NO_LOCATIONS")}
                                    </MUI_Material.Typography>
                                </MUI_Material.Grid>

                            }
                            <MUI_Material.Typography className={messageStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_INIT_SUCCESS ? "cls-dkph-input-header-340" : "cls-dkph-input-header-295"} sx={{ mt: 2 }}>
                                {t("STRIPE_INPUT_FIELD_REGISTERATION_CODE")}
                            </MUI_Material.Typography>
                            <MUI_Material.Grid className="cls-dkph-input-field-wrapper">
                                <Styles.StyledRegCodeField
                                    id="registration code"
                                    // label="Registration Code"
                                    variant="outlined"
                                    color="info"
                                    required
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setRegistrationCode(event.target.value);
                                    }}
                                    value={registrationCode}
                                    placeholder="Enter Pairing Code"
                                    sx={{
                                        mt: 1,
                                        input: { color: "var(--black)" },
                                        label: { color: "var(--black)" },
                                        fieldset: { borderColor: "var(--black)" },
                                        minWidth: "19rem",
                                    }}
                                    disabled={isReaderConnected && !isEditRegCode}
                                    inputProps={{ maxLength: 64 }}
                                    onKeyDown={(event: any) => {
                                        if (event.which === 13) {
                                            setRegistrationCode("");
                                        }
                                    }}

                                />
                                {isReaderConnected && <MUI_Material.IconButton
                                    onClick={() => setIsEditRegCode(!isEditRegCode)}
                                >
                                    {!isEditRegCode ? (
                                        <IconGallery.IEditIcon />
                                    ) : (
                                        <IconGallery.ClearIcon />
                                    )}
                                </MUI_Material.IconButton>}
                            </MUI_Material.Grid>
                            <MUI_Material.Grid className="cls-dkph-hearland-error">
                                {messageStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_INIT_FAIL
                                    ? t("STRIPE_CONNECTION_ERROR")
                                    : ""}
                            </MUI_Material.Grid>
                            <MUI_Material.Grid className="modal-buttons">
                                {messageStatus === "success" && (
                                    <Styles.StyledButton
                                        variant="outlined"
                                        style={{
                                            backgroundColor: "var(--white)",
                                            border: "1px solid var(--black)",
                                            color: "var(--black)",
                                            marginRight: 10,
                                        }}
                                        onClick={() => {
                                            localStorage.removeItem(GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED);
                                            setIsAuthenticated(false);
                                            setTimeout(() => onClose(), 100);
                                        }}
                                    >
                                        <MUI_Material.Typography
                                            style={{
                                                color: "var(--black)",
                                            }}
                                            variant="h6"
                                            component="h6"
                                        >
                                            {t('STRIPE_CANCEL')}
                                        </MUI_Material.Typography>
                                    </Styles.StyledButton>
                                )}
                                <Styles.StyledButton
                                    variant="contained"
                                    disabled={isConnectButtonLoading || !enableConnectButton}
                                    onClick={() => onSubmit({ ...handleCreatePayload() })}
                                >
                                    <MUI_Material.Typography variant="h6" component="h6">
                                        {!isConnectButtonLoading
                                            ? messageStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_INIT_FAIL
                                                ? t('STRIPE_RETRY')
                                                : confirmText
                                            : confirmLoaderText}
                                    </MUI_Material.Typography>
                                </Styles.StyledButton>
                            </MUI_Material.Grid>
                        </Styles.StyledInputContainer>
                    </Styles.StyledFormControl></>) : (<Authentication
                        setIsAuthenticated={setIsAuthenticated}
                        onClose={onClose}
                    />)}
            </Styles.StyledBox>
        </MUI_Material.Modal>
    );
};

export default ConnectReaderModal;
export { ConnectReaderModal };
