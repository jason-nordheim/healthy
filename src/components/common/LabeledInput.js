/**
 * Creates <label> and <input> with bootstrap classes
 */
export const LabeledInput = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
}) => {
  return type === "number" ? (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        name={name}
        min={min}
        max={max}
        required={required}
        onChange={onChange}
      />
    </>
  ) : (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        name={name}
        required={required}
        onChange={onChange}
      />
    </>
  );
};
