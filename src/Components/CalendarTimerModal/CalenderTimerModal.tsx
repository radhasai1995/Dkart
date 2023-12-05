import * as React from "react";
import { Modal } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as Styles from "./styles";

const CalendarTimerModal = (props: any) => {
    const { isOpen = false,
        onHandleChangeDatePicker: onChange = () => "",
        onCloseDatePicker: onClose = () => "",
        onSubmitDatePickerValue: onAccept = () => "" } = props || {}
    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Styles.StyledBox>
                <Styles.StyledInputContainer >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Styles.StyledDemoContainer components={["StaticDateTimePicker"]}>
                            <Styles.StyledDemoItem label="Static variant">
                                <Styles.StyledDateTimePicker
                                    defaultValue={dayjs("2022-04-17T15:30")}
                                    onChange={onChange}
                                    onClose={onClose}
                                    onAccept={onAccept}
                                />
                            </Styles.StyledDemoItem>
                        </Styles.StyledDemoContainer>
                    </LocalizationProvider>
                </Styles.StyledInputContainer >
            </Styles.StyledBox>
        </Modal>
    );
}
export { CalendarTimerModal };
export default CalendarTimerModal;