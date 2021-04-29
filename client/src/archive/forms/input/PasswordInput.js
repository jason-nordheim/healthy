export const PasswordInput = ({
  password,
  required = true,
  displayHelp = true,
  onChange,
}) => {
  console.log();
  return (
    <>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        name="password"
        required={required}
        onChange={onChange}
      />
    </>
  );
};
