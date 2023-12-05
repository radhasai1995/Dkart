import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogContent, Grid } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledDatePicker } from "../styles";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportDateModal = (props: any) => {
  const {
    openDatePickerModal,
    setOpenDatePickerModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onHandleSaveButtonClick,
  } = props;

  return (
    <div>
      <Dialog
        open={openDatePickerModal}
        TransitionComponent={Transition}
        fullWidth={true}
      >
        <AppBar
          sx={{
            position: "relative",
            background: "var(--white)",
            color: "var(--black)",
          }}
        >
          <Toolbar>
            <Grid container>
              <Grid xs={10}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpenDatePickerModal(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid xs={2}>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => onHandleSaveButtonClick()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{ minHeight: "65vh", background: "var(--white)", color: "var(--black)" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <Grid container>
                <Grid xs={5.5}>
                  <StyledDatePicker
                    sx={{ width: "100%" }}
                    label="Start"
                    value={startDate}
                    onChange={(newValue: any) => setStartDate(newValue)}
                  />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={5.5}>
                  <StyledDatePicker
                    sx={{ width: "100%" }}
                    label="End"
                    value={endDate}
                    onChange={(newValue: any) => setEndDate(newValue)}
                    maxDate={dayjs(new Date())}
                  />
                </Grid>
              </Grid>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportDateModal;
export { ReportDateModal };
