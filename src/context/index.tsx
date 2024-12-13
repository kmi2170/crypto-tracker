import {
  createContext,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Currencies } from "../api/types";

export type CurrencyContextType = {
  currency: Currencies;
  setCurrency: React.Dispatch<SetStateAction<Currencies>>;
};

export const CurrencyContext = createContext<CurrencyContextType>(
  {} as CurrencyContextType
);

export const CurrencyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currency, setCurrency] = useState<Currencies>("usd");

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
    }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
