import { createContext } from 'react';

// share monthly payment so header can show it
export const PaymentContext = createContext({
  monthly: null as number | null,
  setMonthly: (_n: number | null) => {},
});
