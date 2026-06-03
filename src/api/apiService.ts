// POST loan details to the backend
const URL = 'https://a3-loan.onrender.com/calculate';

export async function calculateLoan(data: {
  loanType: string;
  loanAmount: number;
  term: number;
  creditScore: string;
  houseAge: number;
}) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('bad response');
  }

  return res.json();
}
