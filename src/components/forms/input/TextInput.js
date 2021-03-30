export const TextInput = ({ id, value, name, required = true, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      id={id}
      value={value}
      name={name}
      required={required}
      onChange={onChange}
    />
  );
};
