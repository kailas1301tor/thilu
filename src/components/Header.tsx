import { useContext } from 'react';
import { PaymentContext } from '../context/AppContext';

export function Header() {
  const { monthly } = useContext(PaymentContext);

  let display = '—';
  if (monthly != null) {
    display = '$' + monthly.toFixed(2);
  }

  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between">
        <div>
          <h1 className="h4 mb-0">ZZZ Bank</h1>
          <small>Home loan calculator</small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="small">Monthly payment</div>
          <strong className="fs-5">{display}</strong>
        </div>
      </div>
    </header>
  );
}
