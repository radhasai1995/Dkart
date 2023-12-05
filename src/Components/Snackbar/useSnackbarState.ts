import React from "react";

function useSnackbarState() {
  const [openStack, setOpenStack] = React.useState<boolean>(false);
  const [vertical, setVertical] = React.useState<string>("bottom");
  const [horizontal, setHorizontal] = React.useState<string>("right");
  const [message, setMessage] = React.useState<string>("");
  const [severityNote, setSeverityNote] = React.useState<string>("info");

  const handleClickStack = () => {
    setOpenStack(true);
  };
  const handleCloseStack = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenStack(false);
  };

  return {
    openStack,
    setOpenStack,
    vertical,
    setVertical,
    horizontal,
    setHorizontal,
    message,
    setMessage,
    handleClickStack,
    handleCloseStack,
    severityNote,
    setSeverityNote,
  };
}

export { useSnackbarState };
export default useSnackbarState;
