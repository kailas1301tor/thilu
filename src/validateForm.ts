// validation only runs when they hit calculate - brief is strict about no form libraries

type Form = {
  loanType: string;
  loanAmount: string;
  term: string;
  creditScore: string;
  houseAge: string;
};

export type FormErrors = Partial<Record<keyof Form, string>>;

const loanTypes = ['Fixed rate', 'Variable rate', 'Interest only'];
const scores = ['Excellent', 'Good', 'Fair', 'Poor'];

export function validateForm(f: Form): FormErrors {
  const e: FormErrors = {};

  if (!f.loanType.trim()) e.loanType = 'Loan type is required.';
  else if (!loanTypes.includes(f.loanType))
    e.loanType = 'Pick Fixed rate, Variable rate, or Interest only.';

  const amount = Number(f.loanAmount);
  if (!f.loanAmount.trim()) e.loanAmount = 'Loan amount is required.';
  else if (!amount || amount <= 0) e.loanAmount = 'Loan amount must be positive.';

  const term = Number(f.term);
  if (!f.term.trim()) e.term = 'Term is required.';
  else if (!term || term <= 0) e.term = 'Term must be a positive number.';
  else if (f.loanType === 'Interest only' && (term < 1 || term > 10))
    e.term = 'Interest only: term must be 1–10 years.';
  else if (
    (f.loanType === 'Fixed rate' || f.loanType === 'Variable rate') &&
    (term < 1 || term > 30)
  )
    e.term = 'Fixed/Variable: term must be 1–30 years.';

  if (!f.creditScore.trim()) e.creditScore = 'Credit score is required.';
  else if (!scores.includes(f.creditScore))
    e.creditScore = 'Choose Excellent, Good, Fair, or Poor.';

  const age = Number(f.houseAge);
  if (!f.houseAge.trim()) e.houseAge = 'House age is required.';
  else if (age < 0 || Number.isNaN(age))
    e.houseAge = 'House age must be zero or more.';

  return e;
}

export function hasErrors(e: FormErrors) {
  return Object.keys(e).length > 0;
}
