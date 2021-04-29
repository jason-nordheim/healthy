export const NumberInput = ({
  id,
  value,
  name,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  required = true,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type="number"
      className={disabled ? "form-control text-muted" : "form-control"}
      id={id}
      value={value}
      name={name}
      min={min}
      max={max}
      required={required}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
