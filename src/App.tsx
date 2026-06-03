import { createContext, useContext, useState } from 'react';
import { Header } from './Header';
import { LoanForm } from './LoanForm';

// monthly payment in header has to use context - brief says no redux etc
export const PaymentContext = createContext<{
  monthly: number | null;
  setMonthly: (n: number | null) => void;
}>({ monthly: null, setMonthly: () => {} });

export function usePayment() {
  return useContext(PaymentContext);
}

export default function App() {
  const [monthly, setMonthly] = useState<number | null>(null);

  return (
    <PaymentContext.Provider value={{ monthly, setMonthly }}>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <LoanForm />
        </main>
        <footer className="bg-light border-top py-3 mt-auto text-center text-muted small">
          <p className="mb-0">ZZZ Bank © {new Date().getFullYear()} — estimates only, not an offer</p>
        </footer>
      </div>
    </PaymentContext.Provider>
  );
}
