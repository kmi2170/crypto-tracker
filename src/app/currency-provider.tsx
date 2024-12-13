"use client";

import { ReactNode } from "react";
import { CurrencyContextProvider } from "../context";

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  return <CurrencyContextProvider>{children}</CurrencyContextProvider>;
};

export default CurrencyProvider;
