/**
 * Task 4 — substantial unit test for loan form validation.
 *
 * Purpose: The assessment requires different maximum loan terms depending on
 * loan type (1–30 years for Fixed/Variable, 1–10 for Interest only). This test
 * ensures we reject an over-limit term before any API call, which protects both
 * Task 2 marks and prevents misleading header monthly payments from bad input.
 */
import { describe, expect, it } from 'vitest';
import {
  hasValidationErrors,
  validateLoanForm,
  validateTerm,
} from '../validation/loanFormValidation';
import type { LoanFormValues } from '../types/loan';

const validBase: LoanFormValues = {
  loanType: 'Fixed rate',
  loanAmount: '500000',
  term: '30',
  creditScore: 'Excellent',
  houseAge: '5',
};

describe('validateTerm', () => {
  it('allows term within 1–30 for Fixed rate', () => {
    expect(validateTerm('Fixed rate', 30)).toBeUndefined();
  });

  it('rejects term above 10 for Interest only', () => {
    expect(validateTerm('Interest only', 15)).toBe(
      'For Interest only loans, term must be between 1 and 10 years.',
    );
  });
});

describe('validateLoanForm — Interest only term cap', () => {
  it('returns a term error and blocks submit when Interest only exceeds 10 years', () => {
    const values: LoanFormValues = {
      ...validBase,
      loanType: 'Interest only',
      term: '15',
    };

    const errors = validateLoanForm(values);

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.term).toBe(
      'For Interest only loans, term must be between 1 and 10 years.',
    );
    expect(errors.loanAmount).toBeUndefined();
    expect(errors.creditScore).toBeUndefined();
  });

  it('accepts a valid Interest only package within the 10-year cap', () => {
    const values: LoanFormValues = {
      ...validBase,
      loanType: 'Interest only',
      term: '10',
    };

    const errors = validateLoanForm(values);

    expect(hasValidationErrors(errors)).toBe(false);
  });
});
