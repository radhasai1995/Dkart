import { styled } from "@mui/material/styles";
import { Grid, Box, Button, Typography } from "@mui/material";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: var(--white);
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
