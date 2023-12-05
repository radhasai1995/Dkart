import { styled } from "@mui/material/styles";
import { Grid, Box, Button, Typography } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 4px;
  border-radius: 10px;

  .cls-modal-title {
    color: var(--darkPink);
  }
  .cls-modal-description {
    color: var(--black);
    font-size: 10px;
  }
  .cls-select-label {
    color: var(--black);
  }
  .modal-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  img {
    padding: 10px;
    height: 150px;
    width: auto;
  }
`;

export const StyledButton = styled(Button)`
  &.Mui-disabled {
    background: var(--darkGray) !important;
  }
  &:hover {
    background-color: var(--lightPink);
  }
  background-color: var(--darkPink);
  border-radius: 8px;
  width: 150px;
  height: 45px;
  margin-top: 9vh;
  h6 {
    color: var(--darkPink);
    font-size: 16px;
    text-transform: capitalize;
  }
`;

export const StyledInputContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 10px;
  width: 400px;
  .cls-dkph-updateInfo-css {
    color: var(--black);
    font-size: 14px;
    font-weight: 600;
    margin: 40px 0px 0px 0px;
  }
`;
export const StyledTypography = styled(Typography)`
  color: var(--black);
  font-size: 20px;
  font-weight: 600;
`;

export const StyledDemoContainer = styled(DemoContainer)`
  background-color: var(--white);
  border-radius: 10px;
  width: 100%;
`;
export const StyledDemoItem = styled(DemoItem)`
  background-color: var(--white);
  border-radius: 10px;
  width: 100%;
`;
export const StyledDateTimePicker = styled(StaticDateTimePicker)`
  span {
    color: var(--lightDarkPink) !important;
  }
  svg {
    fill: var(--lightDarkPink) !important;
  }
  .MuiDateCalendar-root {
    background-color: #fff;
  }
  .MuiPickersToolbar-root {
    background-color: #fff;
  }
  .MuiTabs-flexContainer {
    background-color: #fff;
  }
  .MuiDayCalendar-header span {
    color: var(--black) !important;
  }
  .MuiPickersCalendarHeader-root {
    background-color: #fff;
  }
  .MuiPickersCalendarHeader-label {
    color: var(--darkPink);
  }
  .MuiDayCalendar-weekContainer button {
    color: var(--darkPink);
  }
  .MuiPickersDay-root.Mui-selected {
    color: var(--white) !important;
    background-color: var(--darkPink) !important;
  }
  .MuiClockNumber-root.Mui-selected {
    color: var(--white) !important;
    background-color: var(--darkPink) !important;
  }
  .MuiDialogActions-root {
    background-color: var(--white);
  }
  .MuiDialogActions-root button {
    color: var(--darkPink);
  }
  .MuiTimeClock-root {
    background-color: white;
  }
  .MuiClockPointer-root {
    background-color: var(--darkPink);
  }
  .MuiClock-pin {
    background-color: var(--darkPink);
  }
`;
