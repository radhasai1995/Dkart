import { styled } from "@mui/material/styles";
import { Grid, Box, Button, TextField, FormControl } from "@mui/material";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: fit-content;
  background-color: var(--white);
  overflow: hidden;
  padding: 4px;
  border-radius: 10px;
  .cls-modal-title {
    color: var(--darkPink);
    font-size: 30px;
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

export const SelectStyles = {
  color: "var(--black)",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--black)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--black)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--black)",
  },
  mt: 3,
};

export const StyledButton = styled(Button)`
  &.Mui-disabled {
    background: var(--darkGray) !important;
  }
  &:hover {
    background-color: var(--lightColor);
  }
  background-color: var(--darkPink);
  border-radius: 8px;
  width: 200px;
  height: 45px;
  margin-top: 5vh;
  h6 {
    color: var(--white);
    font-size: 16px;
  }
`;

export const StyledIpAddressField = styled(TextField)`
  width: 50%;
  min-width: 300px;
  height: 52px;
  border: 1px solid var(--black);
  border-radius: 5px;
  color: var(--black);

  &.MuiTextField-root {
    margin: 0px;
  }
  label {
    background-color: var(--white);
    padding: 0px 10px;
    color: var(--black);
    &.Mui-disabled {
      color: var(--black);
    }
  }
  fieldset {
    border: none;
  }
  input: {
    color: var(--black);
  }
  input:disabled {
    -webkit-text-fill-color: var(--darkGray) !important;
  }
  p {
    margin: 0px;
    font-size: 14px;
  }
`;

export const StyledHeader = styled(Grid)`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const StyledFormControl = styled(FormControl)`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .cls-dkph-input-container {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledInputContainer = styled(Grid)`
  .cls-dkph-input-header-340 {
    color: var(--black);
    width: 50%;
    min-width: 340px;
    fontsize: 16px;
    font-weight: 600;
  }
  .cls-dkph-input-header-295 {
    color: var(--black);
    width: 50%;
    min-width: 295px;
    fontsize: 16px;
    font-weight: 600;
  }
  .cls-dkph-input-field-wrapper {
    width: 75%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .cls-dkph-hearland-error {
    text-align: center;
    font-size: 12px;
    width: 100%;
    height: 20px;
    padding: 10px;
    color: var(--red);
    margin-top: 10px;
  }
`;
