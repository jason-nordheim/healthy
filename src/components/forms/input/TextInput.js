export const TextInput = ({
  id,
  value,
  name,
  required = true,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type="text"
      className={disabled ? "form-control text-muted" : "form-control"}
      id={id}
      value={value}
      name={name}
      required={required}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
