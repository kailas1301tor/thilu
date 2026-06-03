type Props = {
  data: {
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
  };
};

export function Results({ data }: Props) {
  const b = data.breakdown;

  return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #ddd' }}>
      <h3 className="h6">Your results</h3>
      <p>
        <b>Monthly payment:</b> ${data.monthlyPayment.toFixed(2)}
      </p>
      <p>
        <b>Total payment:</b> ${data.totalPayment.toFixed(2)}
      </p>
      <p>
        <b>Total interest paid:</b> ${data.totalInterest.toFixed(2)}
      </p>
      <p className="small text-muted">Breakdown</p>
      <ul className="small">
        <li>Loan amount: ${b.loanAmount}</li>
        <li>Term: {b.term} years / {b.termInMonths} months</li>
        <li>Base interest rate: {(b.baseRate * 100).toFixed(2)}%</li>
        <li>Adjusted interest rate: {(b.adjustedRate * 100).toFixed(2)}%</li>
        <li>Credit score multiplier: {b.creditMultiplier}</li>
        <li>House age multiplier: {b.houseAgeMultiplier}</li>
        <li>House age category: {b.houseAgeCategory}</li>
      </ul>
    </div>
  );
}
