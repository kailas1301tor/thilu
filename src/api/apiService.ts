export async function calculateLoan(data: {
  loanType: string;
  loanAmount: number;
  term: number;
  creditScore: string;
  houseAge: number;
}) {
  const res = await fetch('https://a3-loan.onrender.com/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('fail');
  return res.json();
}
