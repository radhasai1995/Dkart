import { Typography, Grid, IconButton, TextField } from "@mui/material";
import * as Styles from "./styles";
export const renderPaymentTypeHeader = (props: any) => {
  const { selectedItem = {} } = props;
  const { title = "Pay Now", subTitle = "Credit Card/Debit Card" } =
    selectedItem || {};
  return (
    <Grid
      style={{
        width: "100%",
        height: "130px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "15px",
      }}
    >
      <Typography variant="h4" style={{ position: "relative" }}>
        {title}
        <span style={{ position: "absolute", top: 32, left: 0 }}>
          <Typography
            variant="h6"
            style={{ width: "300px", padding: 5, textAlign: "start" }}
          >
            {subTitle}
          </Typography>
        </span>
      </Typography>
      {selectedItem?.selected && (
        <Styles.StyledCheckmarkImg src="static/img/checkmark.png" />
      )}
    </Grid>
  );
};
export const renderImmediatePayBodyContent = (props: any) => {
  return (
    <Styles.StyledSelectedPaymentTypeWrapper>
      <Styles.StyledPaymentTypeImg src="static/img/immediatePay.png" />
    </Styles.StyledSelectedPaymentTypeWrapper>
  );
};

const CustomTextField = (props: any) => {
  const {
    name = "",
    defaultValue = "",
    onUpdate = () => "",
    isRequired = true,
    styles = {},
    showError = false,
    errMsg = ''
  } = props || {};
  return (
    <Grid style={{ marginBottom: 20 }}>
      <Grid>
        <span>{name}</span>
        {isRequired ? (
          <span style={{ color: "red" }}>{`*`}</span>
        ) : (
          <span>{`(Optional)`}</span>
        )}
      </Grid>
      <TextField
        style={{ width: 320, maxWidth: 320, minWidth: 320, ...styles }}
        id="input-with-sx"
        variant="outlined"
        placeholder={`Enter ${name}`}
        defaultValue={defaultValue}
        onChange={onUpdate}
        error={showError}
        helperText={showError ? errMsg : ""}
        inputProps={{
          maxLength: 10,
        }}
      />
    </Grid>
  );
};
export const renderLaterPayBodyContent = (props: any) => {
  const {
    selectedItem = {},
    setPayLaterInfo = () => "",
    getPayLaterInfo = [],
    plErrorMessage
  } = props;

  const { form = {} } = selectedItem || {};
  const { lastName = "", roomNo = "", zipcode = "" } = form || {};
  const defaultErrorMessage = "Incorrect lastname or room no";
  return (
    <Styles.StyledSelectedPaymentTypeWrapper>
      <Grid style={{ width: "calc(100% - 200px)", marginRight: 15 }}>
        <CustomTextField
          name="Last Name"
          defaultValue={lastName}
          showError={plErrorMessage}
          errMsg={defaultErrorMessage}
          onUpdate={(e: any) => {
            let test = {
              ...getPayLaterInfo[1],
              form: {
                ...form,
                lastName: e.target.value.trim(),
              },
            };
            let setValue = [getPayLaterInfo[0], test];
            setPayLaterInfo(setValue);
          }}
        />
        <CustomTextField
          name="Room No"
          defaultValue={roomNo}
          showError={plErrorMessage}
          errMsg={defaultErrorMessage}
          onUpdate={(e: any) => {
            let test = {
              ...getPayLaterInfo[1],
              form: {
                ...form,
                roomNo: e.target.value.trim(),
              },
            };
            let setValue = [getPayLaterInfo[0], test];
            setPayLaterInfo(setValue);
          }}
        />
      </Grid>
      <Styles.StyledPaymentTypeImg
        className="cls-dkph-later-pay-img"
        src="static/img/payLater.png"
      />
    </Styles.StyledSelectedPaymentTypeWrapper>
  );
};
export const renderPaymentType = (props: any) => {
  const { getSelectedPaymentType = {}, showImmediatePay = true } = props;
  const { isImmediatePay = true, isLaterPay = false } =
    getSelectedPaymentType || ({} as any);
  return (
    <Styles.StyledPaymentTypeGridWrapper>
      {renderPaymentTypeHeader({})}
      {showImmediatePay
        ? renderImmediatePayBodyContent({})
        : renderLaterPayBodyContent({})}
    </Styles.StyledPaymentTypeGridWrapper>
  );
};
