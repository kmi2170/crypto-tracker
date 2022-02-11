import { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  currency: string;
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const CryptoContext = createContext({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode;
}

const CryptoProvider = ({ children }: ProviderProps) => {
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  useEffect(() => {
    if (currency === "USD") setSymbol("$")
    else if (currency === "EUR") setSymbol("€")
    else if (currency === "JPY") setSymbol("¥")
  }, [currency])

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider >
  )
}

export default CryptoProvider

export const CryptoState = () => {
  return useContext<ContextProps>(CryptoContext)
}
