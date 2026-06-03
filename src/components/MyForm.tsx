import { useContext, useState } from 'react';
import { calculateLoan } from '../api/apiService';
import { PaymentContext } from '../context/AppContext';
import { validateForm } from '../validateForm';
import { Results } from './Results';

export function MyForm() {
  const { setMonthly } = useContext(PaymentContext);

  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [houseAge, setHouseAge] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const form = { loanType, loanAmount, term, creditScore, houseAge };
    const err = validateForm(form);
    setErrors(err);
    setApiError('');
    setResult(null);
    setMonthly(null);

    if (Object.keys(err).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const json = await calculateLoan({
        loanType,
        loanAmount: Number(loanAmount),
        term: Number(term),
        creditScore,
        houseAge: Number(houseAge),
      });
      setResult(json);
      setMonthly(json.monthlyPayment);
    } catch {
      setApiError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5">Calculate your home loan</h2>

          <form onSubmit={handleCalculate}>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Loan type</label>
                <select
                  name="loanType"
                  className="form-select"
                  value={loanType}
                  onChange={(e) => {
                    setLoanType(e.target.value);
                    setErrors({});
                    setMonthly(null);
                  }}
                >
                  <option value="">-- choose --</option>
                  <option value="Fixed rate">Fixed rate</option>
                  <option value="Variable rate">Variable rate</option>
                  <option value="Interest only">Interest only</option>
                </select>
                {errors.loanType && (
                  <div className="error text-danger small">{errors.loanType}</div>
                )}

                <label className="form-label mt-2">Loan amount</label>
                <input
                  name="loanAmount"
                  type="number"
                  className="form-control"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                {errors.loanAmount && (
                  <div className="text-danger small mt-1">{errors.loanAmount}</div>
                )}

                <label className="form-label mt-2">Term (years)</label>
                <input
                  name="term"
                  type="number"
                  className="form-control"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                {errors.term && <div className="error">{errors.term}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Credit score</label>
                <select
                  name="creditScore"
                  className="form-select"
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                >
                  <option value="">-- choose --</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                {errors.creditScore && (
                  <div className="text-danger small">{errors.creditScore}</div>
                )}

                <label className="form-label mt-2">House age</label>
                <input
                  name="houseAge"
                  type="number"
                  className="form-control"
                  value={houseAge}
                  onChange={(e) => setHouseAge(e.target.value)}
                />
                {errors.houseAge && (
                  <div className="error text-danger small mt-1">{errors.houseAge}</div>
                )}
              </div>
            </div>

            {apiError && (
              <p className="alert alert-danger mt-3">{apiError}</p>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  loading...
                </>
              ) : (
                'Calculate'
              )}
            </button>
          </form>

          {result && <Results data={result} />}
        </div>
      </div>
    </div>
  );
}
