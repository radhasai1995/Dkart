import * as React from "react";
import { css } from "emotion";
import Button from "./components/Button/Button.jsx";
import Group from "./components/Group/Group.jsx";
import Icon from "./components/Icon/Icon.jsx";
import Section from "./components/Section/Section.jsx";
import Text from "./components/Text/Text.jsx";

const ConnectionInfo = (props: any) => {
    const { onClickDisconnect = () => "", reader = null, onClose = () => "", requestInProgress = false } = props || {};
    return (
        <Group direction="column" spacing={0}>
            <Section position="first" >
                <Group
                    direction="row"
                    alignment={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text size={16} color="dark">
                        Connection Info
                    </Text>

                </Group>
            </Section>
            <Section position="middle" height="380px">
                {reader?.id ? (
                    <Group
                        direction="row"
                        alignment={{
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Group direction="row">
                            <span>
                                <Icon icon="keypad" />
                            </span>
                            <Text truncate color="dark" size={14}>
                                {reader.label}
                            </Text>
                        </Group>
                        <Button color="text" onClick={() => { onClickDisconnect() }}>
                            Disconnect
                        </Button>
                    </Group>
                ) : (
                    <Group direction="row">
                        <span>
                            <Icon icon="keypad" />
                        </span>
                        <Text color="lightGrey" size={14}>
                            No reader connected
                        </Text>
                    </Group>
                )}
            </Section>
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
                </Group>

            </Section >
        </Group>
    );
}
export { ConnectionInfo };
export default ConnectionInfo;
