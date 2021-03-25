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
}) => {
  return (
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
