export const Label = ({ name, label }) => {
  return (
    <label htmlFor={name} className="form-label fw-lighter">
      {label}
    </label>
  );
};
