import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "./components/Button/Button.jsx";
import Group from "./components/Group/Group.jsx";
import ReaderIcon from "./components/Icon/reader/ReaderIcon.jsx";
import Section from "./components/Section/Section.jsx";
import Text from "./components/Text/Text.jsx";


const DiscoverReaders = (props: any) => {
    const {
        onClickCancelDiscover = () => "",
        onClickDiscover = () => "",
        onClickRegister = () => "",
        discoveryInProgress = false,
        setDiscoveryInProgress = () => false,
        requestInProgress = false,
        setRequestInProgress = () => false,
        discoveredReaders = [],
        onConnectToReader = () => "",
        onClose = () => "",
        selectedReader = null,
        onClickDisconnectReader= () => "",
    } = props || {};

    const onTriggerCancelDiscoverReaders = () => {
        setDiscoveryInProgress(false);
        onClickCancelDiscover();
    };
    const onTriggerDiscoverReaders = async () => {
        setDiscoveryInProgress(true);
        setRequestInProgress(true);
        try {
            await onClickDiscover();
        } finally {
            setDiscoveryInProgress(false);
            setRequestInProgress(false);
        }
    };
    const onHandleConnectToReader = async (readerProps: any) => {
        setRequestInProgress(true);
        try {
            if (readerProps?.serial_number === selectedReader?.serial_number) {
                await onClickDisconnectReader(readerProps);
            } else {
                await onConnectToReader(readerProps); 
            }
        } finally {
            setRequestInProgress(false);
        }
    };
    const renderReaders = (props: any) => {
        const { readers = [] } = props || {};
        if (discoveryInProgress) {
            return (
                <Section position="middle" height="380px">
                    <Text size={14} color="darkGrey">
                        Discovering...
                    </Text>
                </Section>
            );
        } else if (readers.length >= 1) {
            return readers.map((reader: any, i: number) => {
                const isOffline = reader?.status === "offline";
                return (
                    <Section position="middle" key={i} >
                        <Group
                            direction="row"
                            alignment={{
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Group direction="row" style={{ color: "#000" }}>
                                <ReaderIcon />
                                <Group direction="column" >
                                    <Text size={16} color="darkGrey">
                                        {reader?.label}
                                    </Text>
                                    <Group direction="row">
                                        <Text size={11} color="darkGrey">
                                            {reader?.serial_number}
                                        </Text>
                                    </Group>
                                </Group>
                            </Group>
                            <Button
                                disabled={isOffline || requestInProgress || selectedReader && (reader?.serial_number !== selectedReader?.serial_number)}
                                color={isOffline || requestInProgress || selectedReader && (reader?.serial_number !== selectedReader?.serial_number) ? "white" : "primary"}
                                onClick={() => { onHandleConnectToReader(reader) }}
                            >
                                <Text
                                    size={14}
                                    color={isOffline || requestInProgress || selectedReader && (reader?.serial_number !== selectedReader?.serial_number) ? "darkGrey" : "white"}
                                >
                                    {isOffline ? "Offline" : reader?.serial_number === selectedReader?.serial_number ? "Disconnect": "Connect"}
                                </Text>
                            </Button>
                        </Group>
                    </Section>
                );
            });
        } else {
            return (
                <Section position="middle" height="380px">
                    <Group
                        direction="column"
                        spacing={12}
                        alignment={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <ReaderIcon />

                        <Text color="darkGrey" size={15}>
                            Register a new reader, then discover readers on your account. You
                            can also use the reader simulator provided by the SDK if you don't
                            have hardware.
                        </Text>
                    </Group>
                </Section>
            );
        }
    }
    const renderReaderRegistration = () => {
        return (
            <Section position="last" >
                <Group
                    direction="row"
                    alignment={{ justifyContent: "flex-end", alignItems: "center" }}
                    spacing={8}
                >
                    <Button onClick={() => { onClose() }} disabled={requestInProgress}>
                        <Text size={14} color="dark">
                            Close
                        </Text>
                    </Button>
                   {!selectedReader?.id && <Button onClick={() => { onClickRegister() }} disabled={requestInProgress}>
                        <Text size={14} color="dark">
                            Register reader
                        </Text>
                    </Button>}

                </Group>

            </Section >)
    }
    const renderReaderConnection = () => {
        return (
            <Section position="first" >
                <Group
                    direction="row"
                    alignment={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text size={16} color="dark">
                        Connect to a reader
                    </Text>
                    {discoveryInProgress ? (
                        <Button
                            color="text"
                            onClick={() => { onTriggerCancelDiscoverReaders() }}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            color="text"
                            onClick={() => { onTriggerDiscoverReaders() }}
                            disabled={requestInProgress}
                        >
                            Discover
                        </Button>
                    )}
                </Group>
            </Section>)
    }
    useEffect(() => {
        onTriggerDiscoverReaders();
    }, [])
    return (

        <Group direction="column" spacing={0}>
            {renderReaderConnection()}
            <Grid style={{ height: 380 }}>
                {renderReaders({ readers: discoveredReaders })}
            </Grid>
            {renderReaderRegistration()}
        </Group>

    );

}
export { DiscoverReaders };
export default DiscoverReaders;
