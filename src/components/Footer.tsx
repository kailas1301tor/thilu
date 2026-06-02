export function Footer() {
  return (
    <footer className="bg-light border-top py-4 mt-auto">
      <div className="container text-center text-muted small">
        <p className="mb-1">
          © {new Date().getFullYear()} ZZZ Bank. All rights reserved.
        </p>
        <p className="mb-0">
          This calculator provides estimates only and is not a loan offer.
        </p>
      </div>
    </footer>
  );
}
