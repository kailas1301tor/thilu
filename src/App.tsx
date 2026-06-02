import { LoanCalculatorForm } from './components/LoanCalculatorForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoanPaymentProvider } from './context/LoanPaymentContext';

function App() {
  return (
    <LoanPaymentProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <LoanCalculatorForm />
        </main>
        <Footer />
      </div>
    </LoanPaymentProvider>
  );
}

export default App;
