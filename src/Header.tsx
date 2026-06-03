import { usePayment } from './App';

export function Header() {
  const { monthly } = usePayment();

  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h1 className="h4 mb-0">ZZZ Bank</h1>
          <small className="opacity-75">Home loan calculator</small>
        </div>
        <div className="text-end">
          <small className="d-block opacity-75">Monthly payment</small>
          <strong className="fs-5">
            {monthly != null ? `$${monthly.toLocaleString('en-AU', { minimumFractionDigits: 2 })}` : '—'}
          </strong>
        </div>
      </div>
    </header>
  );
}
