import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MyForm } from './components/MyForm';
import { PaymentContext } from './context/AppContext';

export default function App() {
  const [monthly, setMonthly] = useState<number | null>(null);

  return (
    <PaymentContext.Provider value={{ monthly, setMonthly }}>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <MyForm />
        </main>
        <Footer />
      </div>
    </PaymentContext.Provider>
  );
}
