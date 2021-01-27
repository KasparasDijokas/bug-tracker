import React from "react";
import { Btn } from "./styles/button";

export default function Button({ children, ...restProps }) {
  return <Btn {...restProps}>{children}</Btn>;
}
