import { useState } from "react";
import { Modal } from "@mui/material";
import DiscoverReaders from "./DiscoverReaderModal";
import RegisterNewReader from "./RegisterNewReader";
import ConnectionInfo from "./ConnectionInfo";
import { Authentication } from "../Authentication";
import * as Styles from "./styles.js";
import * as GlobalFixture from "@globalFixture";
const ReaderModal = (props: any) => {
    const {
        open: isOpen = false,
        discoveredReaders = [],
        onClickDiscover = () => "",
        onClickCancelDiscover = () => "",
        onRegister = () => "",
        onConnectToReader = () => "",
        doGetWisePOSLocations = () => "",
        discoveryInProgress = false,
        setDiscoveryInProgress = () => false,
        requestInProgress = false,
        setRequestInProgress = () => false,
        selectedReader = {},
        onClickDisconnectReader = () => "",
        onClose = () => "",
        isAuthenticated = false,
        setIsAuthenticated = () => false,
    } = props || {};
    const [mode, setMode] = useState("list");
    const onClickRegister = () => {
        setMode("register");
    };
    const handleSwitchToDiscover = () => {
        setMode("list");
    };
    const showAuthDetails =
        isAuthenticated || localStorage.getItem(GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED) === "true";

    const handleOnRegister = (...data: any) => {
        handleSwitchToDiscover();
        onRegister(...data);
    }

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Styles.StyledBox>
                {showAuthDetails ? (
                    <>
                        {mode === "list" || selectedReader?.id ?
                            <DiscoverReaders
                                onClickDiscover={onClickDiscover}
                                selectedReader={selectedReader}
                                onClickCancelDiscover={onClickCancelDiscover}
                                onClickRegister={onClickRegister}
                                onClickDisconnectReader={onClickDisconnectReader}
                                onConnectToReader={onConnectToReader}
                                discoveryInProgress={discoveryInProgress}
                                setDiscoveryInProgress={setDiscoveryInProgress}
                                requestInProgress={requestInProgress}
                                setRequestInProgress={setRequestInProgress}
                                discoveredReaders={discoveredReaders}
                                onClose={onClose}
                            /> : <RegisterNewReader
                                onClickCancel={handleSwitchToDiscover}
                                onRegister={handleOnRegister}
                                doGetWisePOSLocations={doGetWisePOSLocations}
                            />}
                    </>
                    ) : (<Authentication
                        setIsAuthenticated={setIsAuthenticated}
                        onClose={onClose}
                    />)}
            </Styles.StyledBox>
        </Modal>)


}

export { ReaderModal };
export default ReaderModal;