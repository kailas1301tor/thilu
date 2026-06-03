// interest only loans should not allow more than 10 years
import { describe, expect, it } from 'vitest';
import { validateForm } from '../validateForm';

describe('validation', () => {
  it('should fail interest only when term is 15', () => {
    const errors = validateForm({
      loanType: 'Interest only',
      loanAmount: '400000',
      term: '15',
      creditScore: 'Good',
      houseAge: '2',
    });

    expect(errors.term).toBeDefined();
    expect(Object.keys(errors).length).toBeGreaterThan(0);
  });

  it('should pass a valid fixed rate form', () => {
    const errors = validateForm({
      loanType: 'Fixed rate',
      loanAmount: '500000',
      term: '30',
      creditScore: 'Excellent',
      houseAge: '30',
    });

    expect(Object.keys(errors).length).toBe(0);
  });
});
