import { useState, type FormEvent } from 'react';
import { usePayment } from './App';
import { postCalculate } from './api/loanApi';
import { hasErrors, validateForm, type FormErrors } from './validateForm';

const empty = { loanType: '', loanAmount: '', term: '', creditScore: '', houseAge: '' };

export function LoanForm() {
  const { setMonthly } = usePayment();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr] = useState('');
  const [data, setData] = useState<Awaited<ReturnType<typeof postCalculate>> | null>(null);

  const change = (name: keyof typeof empty, value: string) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => {
      const n = { ...p };
      delete n[name];
      return n;
    });
    setApiErr('');
    setData(null);
    setMonthly(null); // dont leave old payment in header after edits
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const err = validateForm(form);
    setErrors(err);
    setApiErr('');
    setData(null);
    setMonthly(null);
    if (hasErrors(err)) return;

    setLoading(true);
    try {
      const res = await postCalculate({
        loanType: form.loanType,
        loanAmount: Number(form.loanAmount),
        term: Number(form.term),
        creditScore: form.creditScore,
        houseAge: Number(form.houseAge),
      });
      setData(res);
      setMonthly(res.monthlyPayment);
    } catch (ex) {
      setApiErr(ex instanceof Error ? ex.message : 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  const b = data?.breakdown;

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Loan details</h2>
          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Loan type</label>
                <select
                  name="loanType"
                  className="form-select"
                  value={form.loanType}
                  onChange={(e) => change('loanType', e.target.value)}
                >
                  <option value="">Select…</option>
                  <option>Fixed rate</option>
                  <option>Variable rate</option>
                  <option>Interest only</option>
                </select>
                {errors.loanType && <div className="text-danger small mt-1">{errors.loanType}</div>}

                <label className="form-label mt-2">Loan amount ($)</label>
                <input
                  name="loanAmount"
                  type="number"
                  className="form-control"
                  value={form.loanAmount}
                  onChange={(e) => change('loanAmount', e.target.value)}
                />
                {errors.loanAmount && <div className="text-danger small mt-1">{errors.loanAmount}</div>}

                <label className="form-label mt-2">Term (years)</label>
                <input
                  name="term"
                  type="number"
                  className="form-control"
                  value={form.term}
                  onChange={(e) => change('term', e.target.value)}
                />
                {errors.term && <div className="text-danger small mt-1">{errors.term}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Credit score</label>
                <select
                  name="creditScore"
                  className="form-select"
                  value={form.creditScore}
                  onChange={(e) => change('creditScore', e.target.value)}
                >
                  <option value="">Select…</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
                {errors.creditScore && <div className="text-danger small mt-1">{errors.creditScore}</div>}

                <label className="form-label mt-2">House age (years)</label>
                <input
                  name="houseAge"
                  type="number"
                  className="form-control"
                  value={form.houseAge}
                  onChange={(e) => change('houseAge', e.target.value)}
                />
                {errors.houseAge && <div className="text-danger small mt-1">{errors.houseAge}</div>}
              </div>
            </div>

            {apiErr && <div className="alert alert-danger mt-3 mb-0">{apiErr}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Calculating…
                </>
              ) : (
                'Calculate'
              )}
            </button>
          </form>

          {data && b && (
            <div className="mt-4 border-top pt-3">
              <h3 className="h6">Results</h3>
              <p className="mb-1"><strong>Monthly:</strong> ${data.monthlyPayment.toFixed(2)}</p>
              <p className="mb-1"><strong>Total payment:</strong> ${data.totalPayment.toFixed(2)}</p>
              <p className="mb-2"><strong>Total interest:</strong> ${data.totalInterest.toFixed(2)}</p>
              <p className="small text-muted mb-1">Breakdown</p>
              <ul className="small mb-0">
                <li>Loan amount: ${b.loanAmount.toLocaleString()}</li>
                <li>Term: {b.term} yrs ({b.termInMonths} months)</li>
                <li>Base rate: {(b.baseRate * 100).toFixed(2)}%</li>
                <li>Adjusted rate: {(b.adjustedRate * 100).toFixed(2)}%</li>
                <li>Credit multiplier: {b.creditMultiplier}</li>
                <li>House age multiplier: {b.houseAgeMultiplier}</li>
                <li>House age category: {b.houseAgeCategory}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
