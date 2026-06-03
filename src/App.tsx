import { createContext, useState } from 'react';
import { Header } from './Header';
import { MyForm } from './MyForm';

export const PaymentContext = createContext({
  monthly: null as number | null,
  setMonthly: (_n: number | null) => {},
});

export default function App() {
  const [monthly, setMonthly] = useState<number | null>(null);

  return (
    <PaymentContext.Provider value={{ monthly, setMonthly }}>
      <Header />
      <MyForm />
      <footer style={{ marginTop: 40, padding: 16, background: '#f5f5f5', textAlign: 'center' }}>
        ZZZ Bank - home loan calculator
      </footer>
    </PaymentContext.Provider>
  );
}
