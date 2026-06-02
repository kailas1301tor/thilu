/** Form field names must match the calculate API request body (assessment brief). */
export type LoanFormField =
  | 'loanType'
  | 'loanAmount'
  | 'term'
  | 'creditScore'
  | 'houseAge';

export type LoanFormValues = {
  loanType: string;
  loanAmount: string;
  term: string;
  creditScore: string;
  houseAge: string;
};

export type LoanFormErrors = Partial<Record<LoanFormField, string>>;

export type CalculateLoanRequest = {
  loanType: string;
  loanAmount: number;
  term: number;
  creditScore: string;
  houseAge: number;
};

export type LoanBreakdown = {
  loanAmount: number;
  term: number;
  baseRate: number;
  adjustedRate: number;
  creditMultiplier: number;
  houseAgeMultiplier: number;
  houseAgeCategory: string;
  termInMonths: number;
};

export type CalculateLoanResponse = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  breakdown: LoanBreakdown;
};

export const LOAN_TYPES = [
  'Fixed rate',
  'Variable rate',
  'Interest only',
] as const;

export const CREDIT_SCORES = [
  'Excellent',
  'Good',
  'Fair',
  'Poor',
] as const;

export const EMPTY_FORM: LoanFormValues = {
  loanType: '',
  loanAmount: '',
  term: '',
  creditScore: '',
  houseAge: '',
};
