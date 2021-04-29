export const SubmitButton = ({ label, onSubmit }) => {
  return (
    <button type="submit" className="btn btn-primary" onClick={onSubmit}>
      {label}
    </button>
  );
};
