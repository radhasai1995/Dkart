//@flow

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "./components/Button/Button.jsx";
import Group from "./components/Group/Group.jsx";
import Section from "./components/Section/Section.jsx";
import Text from "./components/Text/Text.jsx";
import TextInput from "./components/components/TextInput/TextInput.jsx";
import Select from "./components/Select/Select.jsx";
import Link from "./components/Link/Link.jsx";

const RegisterNewReader = (props: any) => {
    const { onRegister = () => "", doGetWisePOSLocations = () => "", onClickCancel = () => "" } = props || {};
    const [registerReaderStates, setRegisterReaderStates] = useState({
        locations: [],
        readerCode: null,
        readerLabel: null,
        readerLocationId: null,
    }) as any;

    useEffect(() => {
        doGetWisePOSLocations({
            cbk: (response: any) => {
                const { status = "", data = [] } = response || {};
                let locationsData = [];
                locationsData = data ? data : [];
                if (status === "success") {
                    if (locationsData.length < 1) {
                        window?.OuterSnackbar.handleClickStack();
                        window?.OuterSnackbar.setSeverityNote("error");
                        window?.OuterSnackbar.setMessage("No Locations Available.");
                    }
                    setRegisterReaderStates({
                        ...registerReaderStates,
                        locations: locationsData,
                        readerLocationId: locationsData.length >= 1 ? locationsData[0].id : null,
                    });
                }
            },
        });
    }, []);


    const onChangeReaderCode = (str: any) => {
        setRegisterReaderStates({ ...registerReaderStates, readerCode: str });
    };

    const onChangeReaderLabel = (str: any) => {
        setRegisterReaderStates({ ...registerReaderStates, readerLabel: str });
    };

    const onChangeReaderLocationId = (str: any) => {
        setRegisterReaderStates({ ...registerReaderStates, readerLocationId: str });
    };

    const onSubmitRegister = (event: any) => {
        event.preventDefault();
        const { readerCode = "", readerLabel = "", readerLocationId = "" } = registerReaderStates || {}
        onRegister({ readerLabel, readerCode, readerLocationId });
    };


    const { readerCode = "", readerLabel = "", locations = [], readerLocationId = "" } = registerReaderStates || {};
    return (
        <Section>
            <form onSubmit={(event) => { onSubmitRegister(event) }}>
                <Group direction="column" spacing={16}>
                    <Group direction="column" spacing={8}>
                        <Text size={16} color="dark">
                            Register new reader
                        </Text>

                    </Group>
                    <Grid style={{ height: 380 }}>
                        <Group direction="column" spacing={8}>

                            <Text size={14} color="darkGrey">
                                Registration code
                            </Text>
                            <TextInput
                                placeholder="quick-brown-fox"
                                value={readerCode}
                                onChange={onChangeReaderCode}
                                ariaLabel="Registration code"
                            />
                            <Text size={14} color="darkGrey">
                                Reader label
                            </Text>
                            <TextInput
                                placeholder="Front desk"
                                value={readerLabel}
                                onChange={onChangeReaderLabel}
                                ariaLabel="Reader label"
                            />
                            <Text size={14} color="darkGrey">
                                Reader location
                            </Text>
                            {locations.length === 0 ? (
                                <Text size={16} color="lightGrey">
                                    Looks like you don't have any locations yet. Start by creating
                                    one in{" "}
                                    <Link
                                        size={12}
                                        href="https://dashboard.stripe.com/terminal/locations"
                                        text="the dashboard"
                                    />
                                    .
                                </Text>
                            ) : (
                                <Group direction="column" spacing={1}>
                                    <Select
                                        items={locations.map((location: any) => ({
                                            value: location?.id,
                                            label: `${location?.display_name} (${location?.id})`,
                                        }))}
                                        value={readerLocationId}
                                        onChange={onChangeReaderLocationId}
                                        ariaLabel="Reader location"
                                        required
                                    />
                                    <Text size={10} color="lightGrey">
                                        You can create more Locations in{" "}
                                        <Link
                                            size={10}
                                            href="https://dashboard.stripe.com/terminal/locations"
                                            text="the dashboard"
                                        />
                                        .
                                    </Text>
                                </Group>
                            )}
                        </Group>
                    </Grid>
                    <Group direction="row" alignment={{ justifyContent: "flex-end" }}>
                        <Button color="white" onClick={onClickCancel}>
                            <Text color="darkGrey" size={14}>
                                Cancel
                            </Text>
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                readerCode === null ||
                                readerCode === "" ||
                                readerLabel === null ||
                                readerCode === ""
                            }
                            color="primary"
                        >
                            <Text color="white" size={14}>
                                Register
                            </Text>
                        </Button>
                    </Group>
                </Group>
            </form>
        </Section>
    );

}
export { RegisterNewReader };
export default RegisterNewReader;
