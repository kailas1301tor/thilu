import { useContext } from 'react';
import { PaymentContext } from './App';

export function Header() {
  const { monthly } = useContext(PaymentContext);

  return (
    <div style={{ background: '#0d6efd', color: 'white', padding: '12px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <b>ZZZ Bank</b>
          <br />
          <span style={{ fontSize: 13 }}>Loan calculator</span>
        </div>
        <div>
          Monthly:{' '}
          <b>
            {monthly === null ? 'n/a' : '$' + monthly.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
}
