import { styled } from "@mui/material/styles";
import { Modal, Box, Button } from "@mui/material";

export const StyledModal = styled(Modal)`
  [class*="Modal-outer"][class*="MuiBox-root"] {
    border-radius: 4px;
  }
  [class*="addObject"] {
    height: 320px;
  }
  [class*="cloneOntology"] {
    height: 320px;
    width: 20% !important;
  }
  .modal-content h5 {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }
  .modal-subtitle {
    margin-bottom: 22px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: var(--darkGray);
  }
  .modal-modal-subtitle {
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: var(--darkGray);
  }
  .modal-modal-confirm-title {
    margin-bottom: 18px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: var(--darkGray);
  }
`;

export const StyledSuccessButton = styled(Button)`
  &.Mui-disabled {
    background: var(--darkGray) !important;
  }
  &:hover {
    background-color: var(--lightPink);
  }
  background-color: var(--darkPink);
  border-radius: 8px;
  width: 100px;
  height: 30px;
  h6 {
    color: var(--white);
    font-size: 16px;
  }
`;
export const StyledCancelButton = styled(Button)`
  &.Mui-disabled {
    background: var(--darkGray) !important;
  }
  &:hover {
    background-color: #f5f5f5;
  }
  background-color: var(--white);
  border-radius: 4px;
  height: 30px;
  width: 100px;
  border: 1px solid #194b54;
  h6 {
    color: #194b54;
    font-size: 16px;
  }
`;

export const StyledObjectCancelButton = styled(Button)`
  &.Mui-disabled {
    background: var(--white) !important;
  }
  &:hover {
    background-color: var(--white);
  }
  background-color: var(--white);
  border-radius: 8px;
  width: 100px;
  height: 30px;
  h6 {
    color: #194b54;
    font-size: 16px;
  }
`;
export const StyledObjectAddButton = styled(Button)`
  &.Mui-disabled {
    background: var(--lightPink) !important;
  }
  &:hover {
    background-color: var(--lightPink);
  }
  background-color: var(--darkPink);
  border-radius: 4px;
  height: 30px;
  width: 100px;
  h6 {
    color: var(--white);
    font-size: 16px;
  }
`;

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 380px;
  max-width: 532px;
  height: 255px;
  background-color: var(--white);
  padding: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.05);

  .ModalTitle {
    display: flex;
    justify-content: center;
  }
  .ModalTitle svg {
    width: 85px;
    height: 85px;
  }

  .inputTitles {
    font-weight: 700;
  }

  .LabelTypeIcons {
    display: grid;
    grid-template-columns: 1% 99%;
  }

  .groupLabelIcons {
    margin-top: 8px;
    margin-left: 30px;
  }

  .modal-shapes span {
    margin-right: 15px;
  }

  .modal-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    grid-gap: 36px;
  }
  .cls-modal-icon {
    font-size: 20px;
    color: var(--darkPink);
  }
  .cls-modal-title {
    color: var(--darkPink);
  }
  @media only screen and (max-width: 650px) {
    width: 80%;
    margin: auto;
    min-width: 80%;
    max-width: 80%;
  }
`;
