import { useContext, useState } from 'react';
import { PaymentContext } from './App';
import { calculateLoan } from './api/apiService';

export function MyForm() {
  const { setMonthly } = useContext(PaymentContext);

  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [houseAge, setHouseAge] = useState('');

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [result, setResult] = useState<any>(null);

  async function handleCalculate(e: any) {
    e.preventDefault();

    const err = validateForm({
      loanType,
      loanAmount,
      term,
      creditScore,
      houseAge,
    });
    setErrors(err);
    setApiError('');
    setResult(null);
    setMonthly(null);

    if (Object.keys(err).length > 0) return;

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
    } catch (err) {
      setApiError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <h3>Enter loan details</h3>

      <form onSubmit={handleCalculate}>
        <div className="row">
          <div className="col-md-6">
            <p>Loan type</p>
            <select
              name="loanType"
              className="form-control"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="">select</option>
              <option value="Fixed rate">Fixed rate</option>
              <option value="Variable rate">Variable rate</option>
              <option value="Interest only">Interest only</option>
            </select>
            {errors.loanType && (
              <div style={{ color: 'red', fontSize: 13 }}>{errors.loanType}</div>
            )}

            <p style={{ marginTop: 10 }}>Loan amount</p>
            <input
              name="loanAmount"
              type="number"
              className="form-control"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            {errors.loanAmount && (
              <div className="text-danger">{errors.loanAmount}</div>
            )}

            <p style={{ marginTop: 10 }}>Term (years)</p>
            <input
              name="term"
              type="number"
              className="form-control"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            {errors.term && <p style={{ color: 'red' }}>{errors.term}</p>}
          </div>

          <div className="col-md-6">
            <p>Credit score</p>
            <select
              name="creditScore"
              className="form-control"
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
            >
              <option value="">select</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            {errors.creditScore && (
              <div style={{ color: 'red' }}>{errors.creditScore}</div>
            )}

            <p style={{ marginTop: 10 }}>House age</p>
            <input
              name="houseAge"
              type="number"
              className="form-control"
              value={houseAge}
              onChange={(e) => setHouseAge(e.target.value)}
            />
            {errors.houseAge && (
              <span style={{ color: 'red', fontSize: 12 }}>{errors.houseAge}</span>
            )}
          </div>
        </div>

        {apiError && <div className="alert alert-danger">{apiError}</div>}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 20 }}
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 25, border: '1px solid #ccc', padding: 12 }}>
          <h4>Results</h4>
          <p>Monthly Payment: ${result.monthlyPayment}</p>
          <p>Total Payment: ${result.totalPayment}</p>
          <p>Total Interest Paid: ${result.totalInterest}</p>
          <hr />
          <p><b>Breakdown</b></p>
          <p>Loan Amount: {result.breakdown.loanAmount}</p>
          <p>Term: {result.breakdown.term}</p>
          <p>Base Interest Rate: {result.breakdown.baseRate}</p>
          <p>Adjusted Interest Rate: {result.breakdown.adjustedRate}</p>
          <p>Credit Score Multiplier: {result.breakdown.creditMultiplier}</p>
          <p>House Age Multiplier: {result.breakdown.houseAgeMultiplier}</p>
          <p>House Age Category: {result.breakdown.houseAgeCategory}</p>
          <p>Term in Months: {result.breakdown.termInMonths}</p>
        </div>
      )}
    </div>
  );
}

// validation when calculate clicked
export function validateForm(f: any) {
  const errors: any = {};

  if (!f.loanType) errors.loanType = 'required';
  else if (
    f.loanType != 'Fixed rate' &&
    f.loanType != 'Variable rate' &&
    f.loanType != 'Interest only'
  ) {
    errors.loanType = 'invalid loan type';
  }

  if (!f.loanAmount) errors.loanAmount = 'required';
  else if (Number(f.loanAmount) <= 0) errors.loanAmount = 'must be positive';

  const t = Number(f.term);
  if (!f.term) errors.term = 'required';
  else if (t <= 0) errors.term = 'must be positive';
  else if (f.loanType == 'Interest only' && t > 10) {
    errors.term = 'max 10 years for interest only';
  } else if (
    (f.loanType == 'Fixed rate' || f.loanType == 'Variable rate') &&
    (t > 30 || t < 1)
  ) {
    errors.term = 'term 1-30 for fixed/variable';
  }

  if (!f.creditScore) errors.creditScore = 'required';
  else if (
    f.creditScore != 'Excellent' &&
    f.creditScore != 'Good' &&
    f.creditScore != 'Fair' &&
    f.creditScore != 'Poor'
  ) {
    errors.creditScore = 'invalid score';
  }

  if (f.houseAge === '') errors.houseAge = 'required';
  else if (Number(f.houseAge) < 0) errors.houseAge = 'cant be negative';

  return errors;
}
