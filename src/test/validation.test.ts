// checking interest only cant go over 10 years
import { describe, expect, it } from 'vitest';
import { validateForm } from '../MyForm';

describe('validateForm', () => {
  it('interest only term 15 should error', () => {
    const e = validateForm({
      loanType: 'Interest only',
      loanAmount: '100000',
      term: '15',
      creditScore: 'Good',
      houseAge: '1',
    });
    expect(e.term).toBeTruthy();
  });

  it('fixed rate 30 years ok', () => {
    const e = validateForm({
      loanType: 'Fixed rate',
      loanAmount: '500000',
      term: '30',
      creditScore: 'Excellent',
      houseAge: '10',
    });
    expect(Object.keys(e).length).toBe(0);
  });
});
