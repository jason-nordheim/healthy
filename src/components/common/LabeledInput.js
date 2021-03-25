/**
 * Creates <label> and <input> with bootstrap classes
 */
export const LabeledInput = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        First Name
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
