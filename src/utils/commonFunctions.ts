import { createContext } from "react";
import { useMQTTSocketHookState } from "./useMQTTSocketHookState";

const GlobalAppContext = createContext({}) as any;
const ipRegexPattern =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
const numberOnlyRegex = /^[0-9\b]+$/;
const getIsValidIPAddress = (ip: string) => ipRegexPattern.test(ip);
const getISO_Format_DateTimeString = (date = new Date()) => {
  let tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: number) {
      return (num < 10 ? "0" : "") + num;
    };
  return {
    dateTime:
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      pad(Math.abs(tzo) % 60),
  };
};

export {
  getISO_Format_DateTimeString,
  getIsValidIPAddress,
  GlobalAppContext,
  useMQTTSocketHookState,
};
