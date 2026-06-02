import type { CalculateLoanResponse } from '../types/loan';
import { formatCurrency, formatPercent } from '../utils/formatCurrency';

type LoanResultsProps = {
  result: CalculateLoanResponse;
};

export function LoanResults({ result }: LoanResultsProps) {
  const { breakdown } = result;

  return (
    <section className="card border-success mt-4" aria-live="polite">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Your loan estimate</h2>
      </div>
      <div className="card-body">
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <p className="text-muted small mb-1">Monthly payment</p>
            <p className="h5 mb-0">{formatCurrency(result.monthlyPayment)}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted small mb-1">Total payment</p>
            <p className="h5 mb-0">{formatCurrency(result.totalPayment)}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted small mb-1">Total interest paid</p>
            <p className="h5 mb-0">{formatCurrency(result.totalInterest)}</p>
          </div>
        </div>

        <h3 className="h6">Detailed breakdown</h3>
        <dl className="row mb-0 small">
          <dt className="col-sm-6">Loan amount</dt>
          <dd className="col-sm-6">{formatCurrency(breakdown.loanAmount)}</dd>

          <dt className="col-sm-6">Term (years)</dt>
          <dd className="col-sm-6">{breakdown.term}</dd>

          <dt className="col-sm-6">Base interest rate</dt>
          <dd className="col-sm-6">{formatPercent(breakdown.baseRate)}</dd>

          <dt className="col-sm-6">Adjusted interest rate</dt>
          <dd className="col-sm-6">{formatPercent(breakdown.adjustedRate)}</dd>

          <dt className="col-sm-6">Credit score multiplier</dt>
          <dd className="col-sm-6">{breakdown.creditMultiplier}</dd>

          <dt className="col-sm-6">House age multiplier</dt>
          <dd className="col-sm-6">{breakdown.houseAgeMultiplier}</dd>

          <dt className="col-sm-6">House age category</dt>
          <dd className="col-sm-6">{breakdown.houseAgeCategory}</dd>

          <dt className="col-sm-6">Term in months</dt>
          <dd className="col-sm-6">{breakdown.termInMonths}</dd>
        </dl>
      </div>
    </section>
  );
}
