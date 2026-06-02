import {
  CREDIT_SCORES,
  LOAN_TYPES,
  type LoanFormErrors,
  type LoanFormField,
  type LoanFormValues,
} from '../types/loan';

const LOAN_TYPE_SET = new Set<string>(LOAN_TYPES);
const CREDIT_SCORE_SET = new Set<string>(CREDIT_SCORES);

/**
 * Term limits depend on loan type per assessment brief:
 * Fixed/Variable 1–30 years, Interest only 1–10 years.
 */
export function validateTerm(
  loanType: string,
  term: number,
): string | undefined {
  if (!Number.isFinite(term) || term <= 0) {
    return 'Term must be a positive number.';
  }

  if (loanType === 'Interest only') {
    if (term < 1 || term > 10) {
      return 'For Interest only loans, term must be between 1 and 10 years.';
    }
    return undefined;
  }

  if (loanType === 'Fixed rate' || loanType === 'Variable rate') {
    if (term < 1 || term > 30) {
      return 'For Fixed or Variable rate loans, term must be between 1 and 30 years.';
    }
    return undefined;
  }

  // loanType invalid — term message is secondary; loanType field will show its own error
  return undefined;
}

function requireNonEmpty(value: string, label: string): string | undefined {
  if (value.trim() === '') {
    return `${label} is required.`;
  }
  return undefined;
}

/**
 * Runs all client-side checks when the user clicks Calculate (Task 2).
 * Returns a map of field errors; empty object means the form can call the API.
 */
export function validateLoanForm(values: LoanFormValues): LoanFormErrors {
  const errors: LoanFormErrors = {};

  const loanTypeError = requireNonEmpty(values.loanType, 'Loan type');
  if (loanTypeError) {
    errors.loanType = loanTypeError;
  } else if (!LOAN_TYPE_SET.has(values.loanType)) {
    errors.loanType =
      'Loan type must be Fixed rate, Variable rate, or Interest only.';
  }

  const loanAmountError = requireNonEmpty(values.loanAmount, 'Loan amount');
  const loanAmount = Number(values.loanAmount);
  if (loanAmountError) {
    errors.loanAmount = loanAmountError;
  } else if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be a positive number.';
  }

  const termError = requireNonEmpty(values.term, 'Term');
  const term = Number(values.term);
  if (termError) {
    errors.term = termError;
  } else {
    const termRangeError = validateTerm(values.loanType, term);
    if (termRangeError) {
      errors.term = termRangeError;
    }
  }

  const creditScoreError = requireNonEmpty(values.creditScore, 'Credit score');
  if (creditScoreError) {
    errors.creditScore = creditScoreError;
  } else if (!CREDIT_SCORE_SET.has(values.creditScore)) {
    errors.creditScore =
      'Credit score must be Excellent, Good, Fair, or Poor.';
  }

  const houseAgeError = requireNonEmpty(values.houseAge, 'House age');
  const houseAge = Number(values.houseAge);
  if (houseAgeError) {
    errors.houseAge = houseAgeError;
  } else if (!Number.isFinite(houseAge) || houseAge < 0) {
    errors.houseAge = 'House age must be a non-negative number.';
  }

  return errors;
}

export function hasValidationErrors(errors: LoanFormErrors): boolean {
  return (Object.keys(errors) as LoanFormField[]).length > 0;
}
