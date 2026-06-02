import type {
  CalculateLoanRequest,
  CalculateLoanResponse,
} from '../types/loan';

const API_BASE = 'https://a3-loan.onrender.com';

/**
 * POST /calculate — used after client validation passes (Task 3b).
 */
export async function calculateLoan(
  payload: CalculateLoanRequest,
): Promise<CalculateLoanResponse> {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Unable to calculate loan (${response.status}).`;
    try {
      const body = (await response.json()) as { message?: string; error?: string };
      message = body.message ?? body.error ?? message;
    } catch {
      // keep default message when body is not JSON
    }
    throw new Error(message);
  }

  return (await response.json()) as CalculateLoanResponse;
}
