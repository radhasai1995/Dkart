import { useEffect } from "react";
import { Modal, Grid, } from "@mui/material";
import CircularProgressBar from "./CircularProgressBar";
import * as Styles from "./styles";
import * as IconGallery from "@iconsGallery";


const CircularProgressModal = (props: any) => {
    const {
        isOpen: isOpen = false,
        isConnectButtonLoading = false,
        confirmText = "Cancel",
        confirmLoaderText = "Loading...",
        onCancelAppUpdate: onClose = () => "",
        progress = 100
    } = props;

    useEffect(() => {
        let mainDom = document?.querySelector("#root") as any;
        if (isOpen) {
            mainDom.classList.add("blur-kit");

        } else {
            mainDom.classList.remove("blur-kit");
        }
        return () => {
            mainDom.classList.remove("blur-kit");
        };

    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Styles.StyledBox>
                <Styles.StyledInputContainer >
                    <div style={{ height: "120px", width: "120px" }}>
                        <IconGallery.IGradientSVG />
                        <CircularProgressBar
                            strokeWidth={3}
                            value={progress}
                            text={`${Math.round(progress)}%`}
                            styles={{
                                path: { stroke: `url(#hello)` },
                                trail: {
                                    stroke: "#d3d3d3"
                                },
                                text: {
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }}
                        />
                    </div>
                    <Styles.StyledTypography
                        className="cls-dkph-updateInfo-css"
                        variant="body2"
                    >{`App is Updating...`}
                    </Styles.StyledTypography>
                    <Grid className="modal-buttons">
                        <Styles.StyledButton
                            variant="outlined"
                            style={{
                                backgroundColor: "var(--white)",
                                border: "1px solid var(--darkPink)",
                                color: "var(--darkPink)",
                                marginRight: 10,
                            }}
                            disabled={progress > 93}
                            onClick={() => { onClose() }}
                        >
                            <Styles.StyledTypography variant="h6" >
                                {!isConnectButtonLoading ? confirmText
                                    : confirmLoaderText}
                            </Styles.StyledTypography>
                        </Styles.StyledButton>
                    </Grid>
                </Styles.StyledInputContainer>
            </Styles.StyledBox>
        </Modal >
    );
};

export default CircularProgressModal;
export { CircularProgressModal };
