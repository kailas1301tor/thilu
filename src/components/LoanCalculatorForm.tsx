import { useState, type FormEvent } from 'react';
import { calculateLoan } from '../api/loanApi';
import { useLoanPayment } from '../context/LoanPaymentContext';
import {
  CREDIT_SCORES,
  EMPTY_FORM,
  LOAN_TYPES,
  type CalculateLoanResponse,
  type LoanFormErrors,
  type LoanFormField,
  type LoanFormValues,
} from '../types/loan';
import {
  hasValidationErrors,
  validateLoanForm,
} from '../validation/loanFormValidation';
import { FieldError } from './FieldError';
import { LoanResults } from './LoanResults';

export function LoanCalculatorForm() {
  const { setMonthlyPayment, clearMonthlyPayment } = useLoanPayment();
  const [values, setValues] = useState<LoanFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<LoanFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculateLoanResponse | null>(null);

  const updateField = (field: LoanFormField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setApiError(null);
    // Avoid showing a stale monthly payment in the header after the user edits inputs.
    clearMonthlyPayment();
    setResult(null);
  };

  const handleCalculate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoanForm(values);
    setErrors(validationErrors);
    setApiError(null);
    setResult(null);
    clearMonthlyPayment();

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        loanType: values.loanType,
        loanAmount: Number(values.loanAmount),
        term: Number(values.term),
        creditScore: values.creditScore,
        houseAge: Number(values.houseAge),
      };

      const response = await calculateLoan(payload);
      setResult(response);
      setMonthlyPayment(response.monthlyPayment);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="h4 mb-4">Calculate your home loan</h2>

          <form onSubmit={handleCalculate} noValidate>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="loanType" className="form-label">
                    Loan type
                  </label>
                  <select
                    id="loanType"
                    name="loanType"
                    className={`form-select ${errors.loanType ? 'is-invalid' : ''}`}
                    value={values.loanType}
                    onChange={(e) => updateField('loanType', e.target.value)}
                  >
                    <option value="">Select loan type</option>
                    {LOAN_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.loanType} />
                </div>

                <div className="mb-3">
                  <label htmlFor="loanAmount" className="form-label">
                    Loan amount ($)
                  </label>
                  <input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    min="0"
                    step="any"
                    className={`form-control ${errors.loanAmount ? 'is-invalid' : ''}`}
                    value={values.loanAmount}
                    onChange={(e) =>
                      updateField('loanAmount', e.target.value)
                    }
                    placeholder="e.g. 500000"
                  />
                  <FieldError message={errors.loanAmount} />
                </div>

                <div className="mb-3">
                  <label htmlFor="term" className="form-label">
                    Term (years)
                  </label>
                  <input
                    id="term"
                    name="term"
                    type="number"
                    min="1"
                    step="1"
                    className={`form-control ${errors.term ? 'is-invalid' : ''}`}
                    value={values.term}
                    onChange={(e) => updateField('term', e.target.value)}
                    placeholder="e.g. 30"
                  />
                  <FieldError message={errors.term} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="creditScore" className="form-label">
                    Credit score
                  </label>
                  <select
                    id="creditScore"
                    name="creditScore"
                    className={`form-select ${errors.creditScore ? 'is-invalid' : ''}`}
                    value={values.creditScore}
                    onChange={(e) =>
                      updateField('creditScore', e.target.value)
                    }
                  >
                    <option value="">Select credit score</option>
                    {CREDIT_SCORES.map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.creditScore} />
                </div>

                <div className="mb-3">
                  <label htmlFor="houseAge" className="form-label">
                    House age (years)
                  </label>
                  <input
                    id="houseAge"
                    name="houseAge"
                    type="number"
                    min="0"
                    step="1"
                    className={`form-control ${errors.houseAge ? 'is-invalid' : ''}`}
                    value={values.houseAge}
                    onChange={(e) => updateField('houseAge', e.target.value)}
                    placeholder="e.g. 30"
                  />
                  <FieldError message={errors.houseAge} />
                </div>
              </div>
            </div>

            {apiError && (
              <div className="alert alert-danger mt-3" role="alert">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Calculating…
                </>
              ) : (
                'Calculate'
              )}
            </button>
          </form>

          {result && <LoanResults result={result} />}
        </div>
      </div>
    </div>
  );
}
