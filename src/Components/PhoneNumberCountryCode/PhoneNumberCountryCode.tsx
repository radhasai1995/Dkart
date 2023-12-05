import {
  Box,
  TextField,
  styled,
  Autocomplete,
  Paper,
  InputAdornment,
} from "@mui/material";
import { countryCodesData } from "./fixture";
import { useTranslation } from "react-i18next";

const TextFieldUI = styled(TextField)`
  color: var(--black);
  background: transparent;
  border-radius: 10px;
  width: 300px;
  input {
    background: var(--white) !important;
    color: var(--black) !important;
    -webkit-box-shadow: 0 0 0 100px var(--white) inset !important;
    -webkit-text-fill-color: var(--black) !important;
  }
  fieldset {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-left: 0 !important;
    border-color: var(--lightGray) !important;
  }
  & .MuiOutlinedInput-input {
    color: var(--black);
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiFormControl-root-MuiTextField-root {
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--fogWhite);
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiOutlinedInput-root {
    border-radius: 10px;
    &:hover {
      border-color: var(--fogWhite);
    }
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 80px;
  fieldset {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    margin-top: -3px !important;
    border-color: #a1a1a1 !important;
  }
  input {
    font-size: 14px;
    font-weight: bold;
  }
  & .MuiOutlinedInput-root {
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--fogWhite);
    border-radius: 10px;
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiAutocomplete-popupIndicator {
    color: rgba(0, 0, 0, 0.54);
  }
  & .MuiAutocomplete-endAdornment {
    right: 4px !important;
  }
  & .MuiAutocomplete-input {
    padding: 7.5px 0px 7.5px 0px !important;
    min-width: 50px !important;
    color: var(--black);
    text-overflow: inherit !important;
    &:hover {
      border-color: var(--fogWhite);
    }
  }
  & .MuiAutocomplete-clearIndicator {
    display: none !important;
  }
`;
const defaultCountryCodes = countryCodesData;
function PhoneNumberCountryCode(props: any) {
  const { countryCodes = defaultCountryCodes || [], disabled = false, onHandleKeyDown = () => "" } = props;
  const { t } = useTranslation();
  let placeholderValue = t("PLACEHOLDER_MOBILE_NUMBER");
  const CustomPaper = (props: any) => {
    return (
      <Paper
        elevation={8}
        style={{ width: 350, backgroundColor: "var(--white)", color: "var(--black)" }}
        {...props}
      />
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        margin: "20px 0px 0px 0px",
        pointerEvents: disabled ? 'none' : 'auto'
      }}

    >
      <StyledAutocomplete
        disablePortal
        id="combo-box-demo"
        options={countryCodes}
        value={props.countryCode}
        onChange={(event: any, newValue: any) => {
          props.handleCodeChange(newValue);
        }}
        PaperComponent={CustomPaper}
        getOptionLabel={(option: any) => ``}
        renderOption={(props: any, option: any) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params: any) => {
          const { inputProps, ...restProps } = params;
          return (
            <TextField
              {...restProps}
              inputProps={{
                ...inputProps,
                readOnly: true,
                autoComplete: "new-password",
                inputMode: 'numeric'
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: props.countryCode ? (
                  <InputAdornment position="start">
                    <img
                      loading="lazy"
                      width="40"
                      style={{ paddingTop: "30px" }}
                      src={`https://flagcdn.com/w40/${props?.countryCode?.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${props?.countryCode?.code.toLowerCase()}.png 4x`}
                      alt=""
                    />
                  </InputAdornment>
                ) : null,
              }}

            />
          );
        }}
      />
      <TextFieldUI
        style={{ width: "100%" }}
        id="input-with-sx"
        variant="outlined"
        placeholder={placeholderValue}
        value={props.phoneNumber}
        onChange={props.handlePhoneNumberChange}
        inputProps={{
          autoComplete: "new-password",
          maxLength: 10,
        }}
        onKeyDown={(event: any) => { onHandleKeyDown({ event, field: "phoneNumber" }) }}
      />
    </Box>
  );
}
export default PhoneNumberCountryCode;
export { PhoneNumberCountryCode };