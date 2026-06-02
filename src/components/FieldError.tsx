type FieldErrorProps = {
  message?: string;
};

/** Task 2: show validation errors directly beside the matching input. */
export function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="text-danger small mt-1" role="alert">
      {message}
    </div>
  );
}
