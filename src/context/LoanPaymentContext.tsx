import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type LoanPaymentContextValue = {
  monthlyPayment: number | null;
  setMonthlyPayment: (value: number | null) => void;
  clearMonthlyPayment: () => void;
};

// Context shares monthly payment with Header without prop drilling (Task 3b requirement).
const LoanPaymentContext = createContext<LoanPaymentContextValue | null>(null);

export function LoanPaymentProvider({ children }: { children: ReactNode }) {
  const [monthlyPayment, setMonthlyPaymentState] = useState<number | null>(null);

  const setMonthlyPayment = useCallback((value: number | null) => {
    setMonthlyPaymentState(value);
  }, []);

  const clearMonthlyPayment = useCallback(() => {
    setMonthlyPaymentState(null);
  }, []);

  const value = useMemo(
    () => ({ monthlyPayment, setMonthlyPayment, clearMonthlyPayment }),
    [monthlyPayment, setMonthlyPayment, clearMonthlyPayment],
  );

  return (
    <LoanPaymentContext.Provider value={value}>
      {children}
    </LoanPaymentContext.Provider>
  );
}

export function useLoanPayment(): LoanPaymentContextValue {
  const context = useContext(LoanPaymentContext);
  if (!context) {
    throw new Error('useLoanPayment must be used within LoanPaymentProvider');
  }
  return context;
}
