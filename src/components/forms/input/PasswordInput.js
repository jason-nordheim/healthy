const PasswordHelpText = () => {
  return (
    <div id="passwordHelp " className="form-text">
      Your password must be 8-20 characters long, contain letters and numbers,
      and must not contain spaces, special characters, or emoji.
    </div>
  );
};

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
      {displayHelp && <PasswordHelpText />}
    </>
  );
};
