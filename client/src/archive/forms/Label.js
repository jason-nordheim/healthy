export const Label = ({ name, label, inputText = false }) => {
  const classes = inputText
    ? "input-group-text fw-light"
    : "form-label fw-lighter";
  return (
    <label htmlFor={name} className={classes}>
      {label}
    </label>
  );
};
