/**
 * Testing the interest-only term rule because thats the trickiest bit in the brief.
 * If someone picks interest only and types 15 years we should block it before
 * hitting the API (max is 10). Also checking a valid fixed rate form passes clean.
 */
import { describe, expect, it } from 'vitest';
import { hasErrors, validateForm } from '../validateForm';

describe('validateForm', () => {
  it('fails when interest only term is over 10 years', () => {
    const errors = validateForm({
      loanType: 'Interest only',
      loanAmount: '400000',
      term: '15',
      creditScore: 'Good',
      houseAge: '5',
    });

    expect(hasErrors(errors)).toBe(true);
    expect(errors.term).toContain('10');
    expect(errors.loanAmount).toBeUndefined();
  });

  it('passes for a normal fixed rate 30 year loan', () => {
    const errors = validateForm({
      loanType: 'Fixed rate',
      loanAmount: '500000',
      term: '30',
      creditScore: 'Excellent',
      houseAge: '30',
    });

    expect(hasErrors(errors)).toBe(false);
  });
});
