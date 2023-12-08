import React from "react";
import { Paper } from "@mui/material";
import * as IconGallery from "@iconsGallery";
import * as Styles from "./styles";
import IconButton from "@mui/material/IconButton";

const AppUpdate = (props: any) => {
    const {
        isOpen = false,
        onHandleUpdateNow = () => "",
        onHandleUpdateLater = () => "", } = props || {};
    const [getSlideOpen, setSlideOpen] = React.useState(false);
    const [getDirection, setDirection] = React.useState<"up" | "down">("down");
    const containerRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (isOpen) {
            setDirection("down")
            setTimeout(() => setSlideOpen(true), 1000)
        }
        else {
            setDirection("up")
            setSlideOpen(false)
        }
    }, [isOpen])

    return (
        <Styles.StyledBox style={{ display: getSlideOpen ? "flex" : "none" }}  >
            <Styles.StyledSlide in={getSlideOpen}
                container={containerRef.current}
                direction={getDirection}
                onEntered={() => setDirection('down')}
                onExited={() => setDirection('up')}
                mountOnEnter
                unmountOnExit
            >
                <Paper sx={{ ...Styles.PaperStyles }} elevation={4}>
                    <Styles.StyledBoxWrapper >
                        <Styles.StyledWrapper >
                            <IconGallery.IAppUpdateSetting />
                            <Styles.StyledTypography>{`Updates are available`}</Styles.StyledTypography >
                        </Styles.StyledWrapper>
                        <Styles.StyledWrapper className="cls-dkph-flex-end">
                            <Styles.StyledButton onClick={onHandleUpdateNow} variant="contained" className="cls-dkph-update-now">{`Now`}</Styles.StyledButton>
                            {/* <Styles.StyledButton onClick={onHandleUpdateLater} variant="contained" className="cls-dkph-update-later">{`later`}</Styles.StyledButton> */}
                            {/* <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => {}}
                                aria-label="close"
                            >
                                <IconGallery.CloseIcon width={20}/>
                            </IconButton> */}
                        </Styles.StyledWrapper>
                    </Styles.StyledBoxWrapper>
                </Paper>
            </Styles.StyledSlide>
        </Styles.StyledBox>
    )
}
export { AppUpdate };
export default AppUpdate;