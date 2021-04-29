export const TextInput = ({
  id,
  value,
  name,
  onChange,
  placeholder = null,
  required = true,
  disabled = false,
}) => {
  return (
    <input
      type="text"
      className={disabled ? "form-control text-muted" : "form-control"}
      id={id}
      value={value || ""}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
