import { useLoanPayment } from '../context/LoanPaymentContext';
import { formatCurrency } from '../utils/formatCurrency';

export function Header() {
  const { monthlyPayment } = useLoanPayment();

  return (
    <header className="bg-primary text-white py-4 shadow-sm">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h1 className="h3 mb-1">ZZZ Bank</h1>
            <p className="mb-0 opacity-75">Home Loan Calculator</p>
          </div>
          <div className="text-md-end">
            <p className="mb-0 small text-uppercase opacity-75">
              Estimated monthly payment
            </p>
            <p className="h4 mb-0 fw-semibold">
              {monthlyPayment !== null
                ? formatCurrency(monthlyPayment)
                : '—'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
