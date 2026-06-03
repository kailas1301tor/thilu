// fetch has to stay out of components or we lose 4 marks
const BASE = 'https://a3-loan.onrender.com';

export async function postCalculate(body: {
  loanType: string;
  loanAmount: number;
  term: number;
  creditScore: string;
  houseAge: number;
}) {
  const res = await fetch(`${BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Server error (${res.status}). Try again.`);
  }

  return res.json() as Promise<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    breakdown: {
      loanAmount: number;
      term: number;
      baseRate: number;
      adjustedRate: number;
      creditMultiplier: number;
      houseAgeMultiplier: number;
      houseAgeCategory: string;
      termInMonths: number;
    };
  }>;
}
