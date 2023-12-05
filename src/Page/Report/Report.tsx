import { Select, Grid, MenuItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  StyledAvatar,
  StyledCard,
  StyledToolbar,
  StyledToolbarTypography,
} from "./styles";
import { ReportDateModal } from "./ReportDateModal";
import { useReportsFixture } from "./fixtures";
import useReportStates from "./useReportPage";
import * as IconGallery from "@iconsGallery";
import * as ComponentLib from "@componentLib";
import * as Styles from "./styles";
import { SelectTagStyles } from "./styles";


const Report = (props: any) => {
  const ReportStates = useReportStates();
  const { t } = useTranslation();
  const { columns = [], daysBasedFilter = [] } = useReportsFixture({ t });
  const {
    getReportPageDetails,
    totalReportRecords,
    reportList,
    onHandleReportPageChange,
    onHandleReportRowsDpChange,
    openDatePickerModal,
    setOpenDatePickerModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onHandleSaveButtonClick,
    isLoading,
    handleChangeDateRange = () => "",
    getSelectedDay = {}
  } = ReportStates;

  const reportProps = {
    rowsPerPage: getReportPageDetails?.rowsPerPage,
    page: getReportPageDetails?.currentReportPage,
    totalDocs: totalReportRecords,
    list: reportList,
    onHandleChangePage: onHandleReportPageChange,
    onHandleChangeRowsPerPage: onHandleReportRowsDpChange,
    columns,
    isLoading: isLoading,
    openDatePickerModal,
    setOpenDatePickerModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onHandleSaveButtonClick,
  };
  const showActions = false;
  return (
    <StyledCard>

      <Styles.StyledTransactionReportCardWrapper>
        <Styles.StyledTransactionReportCardInfo>
          {t("REPORTS_INFO")}
        </Styles.StyledTransactionReportCardInfo>
      </Styles.StyledTransactionReportCardWrapper>
      <Styles.StyledCardContentWrapper >
        <StyledToolbar>
          <StyledToolbarTypography variant="h5">
            {t("REPORTS_PAGE_TITLE")}
            {showActions && <StyledAvatar >
              <IconGallery.CalendarEventIcon
                onClick={() => setOpenDatePickerModal(true)}
              />
            </StyledAvatar>}

          </StyledToolbarTypography>
          {daysBasedFilter?.length ?
            <Grid className="cls-dkph-input-field-wrapper" style={{ position: "relative" }}>
              <StyledToolbarTypography variant="body1" style={{ fontSize: 12, position: "absolute", left: 5, top: -5, width: "100%", }}>
                {t("FILTER_BY")}
              </StyledToolbarTypography>

              <Select
                value={getSelectedDay?.label}
                label="Filter by"
                onChange={(event) => {
                  if (event.target.value === getSelectedDay?.value)
                    return;
                  handleChangeDateRange(event)
                }}
                defaultValue={daysBasedFilter[0]?.label}
                sx={{ ...SelectTagStyles }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      color: "var(--darkPink)",
                      bgcolor: '#fff',
                      '& .MuiMenuItem-root': {
                        border: "1px dashed transparent",
                        borderBottomColor: "var(--darkPink)",
                      },

                    }
                  },
                }}
              >
                {daysBasedFilter && daysBasedFilter.length > 0
                  ? daysBasedFilter.map((day: any) => {
                    return (
                      <MenuItem value={day.value} key={day.value}>
                        {day.label}
                      </MenuItem>
                    );
                  })
                  : null}
              </Select>
            </Grid> :
            <Grid className="cls-dkph-input-field-wrapper">
              <Typography style={{ color: "var(--disableColor)" }}>
                {t("STRIPE_NO_LOCATIONS")}
              </Typography>
            </Grid>
          }
          {showActions && <IconGallery.PrinterIcon />}

        </StyledToolbar>
        <ReportDateModal {...reportProps} />
        <ComponentLib.Table {...reportProps} />
      </Styles.StyledCardContentWrapper >
    </StyledCard>
  );
};

export default Report;
export { Report };
