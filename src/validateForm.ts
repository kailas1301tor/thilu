// run when user clicks calculate

export function validateForm(f: {
  loanType: string;
  loanAmount: string;
  term: string;
  creditScore: string;
  houseAge: string;
}) {
  const errors: Record<string, string> = {};

  if (f.loanType === '') {
    errors.loanType = 'Loan type is required';
  } else
  if (
    f.loanType !== 'Fixed rate' &&
    f.loanType !== 'Variable rate' &&
    f.loanType !== 'Interest only'
  ) {
    errors.loanType = 'Must be Fixed rate, Variable rate or Interest only';
  }

  if (f.loanAmount === '') {
    errors.loanAmount = 'Loan amount is required';
  } else if (Number(f.loanAmount) <= 0) {
    errors.loanAmount = 'Loan amount must be positive';
  }

  const termNum = Number(f.term);
  if (f.term === '') {
    errors.term = 'Term is required';
  } else if (termNum <= 0) {
    errors.term = 'Term must be positive';
  } else if (f.loanType === 'Interest only') {
    if (termNum > 10) errors.term = 'Interest only max 10 years';
    if (termNum < 1) errors.term = 'Term min 1 year';
  } else if (f.loanType === 'Fixed rate' || f.loanType === 'Variable rate') {
    if (termNum > 30 || termNum < 1) errors.term = 'Term must be 1-30 years';
  }

  if (f.creditScore === '') {
    errors.creditScore = 'Credit score is required';
  } else if (
    f.creditScore !== 'Excellent' &&
    f.creditScore !== 'Good' &&
    f.creditScore !== 'Fair' &&
    f.creditScore !== 'Poor'
  ) {
    errors.creditScore = 'Invalid credit score';
  }

  if (f.houseAge === '') {
    errors.houseAge = 'House age is required';
  } else if (Number(f.houseAge) < 0) {
    errors.houseAge = 'House age cant be negative';
  }

  return errors;
}
