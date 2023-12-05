import React from "react";
import { Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as IconGallery from "@iconsGallery";

function Timer(props: any) {
  const { initMinutes = 0, initSeconds = 0 } = props;
  const { t = () => "" } = useTranslation();
  return (
    <Grid style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      <IconGallery.ITimerIcon style={{ fontSize: 40 }} />
      <span style={{ fontSize: 15, marginRight: 10, fontWeight: 'bold', }} >
        {t(`IDLE_TIMER_COUNTDOWN_TEXT`)}</span>
      <span style={{ fontSize: 50, fontWeight: 'bold', lineHeight: 1 }}>{initSeconds < 10 ? `0${initSeconds}` : initSeconds}</span>
    </Grid>
  );
}

export default Timer;
export { Timer };
