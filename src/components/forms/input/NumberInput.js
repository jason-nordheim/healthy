export const NumberInput = ({
  id,
  value,
  name,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  required = true,
  onChange,
}) => {
  return (
    <input
      type="number"
      className="form-control"
      id={id}
      value={value}
      name={name}
      min={min}
      max={max}
      required={required}
      onChange={onChange}
    />
  );
};
