/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "./useInputHooks";
import { styled } from "@mui/material";

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
  autoFocus?: boolean;
}

const InputWrapper = styled("input")`
  width: 42px;
  height: 40px;
  margin: 40px 8px;
  font-size: 3rem;
  text-align: center;
  border-radius: 2px;
  border: 0px;
  border-bottom: 2px solid #DE127F;

  @media (orientation: portrait){ {
    margin-top: 10%;
  }

`;

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <InputWrapper ref={inputRef} {...rest} autoComplete={"nope"} inputMode="numeric" />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
