export const TextInput = ({
  id,
  value,
  name,
  required = true,
  placeholder = null,
  onChange,
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
