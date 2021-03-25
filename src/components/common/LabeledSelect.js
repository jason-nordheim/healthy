const invalidSelectOptions = {
  typeOfArray: "Invalid Prop (`selectOptions`) -  Should be an array",
  singleElement:
    "Invalid Prop (`selectOptions`) - Array should contain at least 1 elements",
  elementProp: (prop) =>
    `Invalid Prop ('selectOptions') - Elements in the array should all have ${prop} properties`,
};

const validateSelectOptions = (selectOptions) => {
  // requires an array of options to place within the select
  if (typeof selectOptions !== typeof [])
    throw new Error(invalidSelectOptions.typeOfArray);

  // should have more than one item to be selected
  if (selectOptions.length <= 1)
    throw new Error(invalidSelectOptions.singleElement);

  // check to make sure the first element has the correct
  // properties,
  const expectedKeys = ["key", "id", "value"];
  expectedKeys.forEach((key) => {
    if (
      Object.keys(selectOptions[0]).includes((property) => {
        console.log(`property: ${property} | value: ${key}`);
        return property === key;
      })
    ) {
      throw new Error(invalidSelectOptions.elementProp(key));
    }
  });
};

export const LabeledSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  selectOptions,
}) => {
  validateSelectOptions(selectOptions);
  return (
    <>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {selectOptions.map((opt) => {
          return opt.id === value ? (
            <option
              key={opt.key}
              id={opt.id}
              value={opt.value}
              className="selected"
            >
              {opt.value}
            </option>
          ) : (
            <option key={opt.key} id={opt.id} value={opt.value}>
              {opt.value}
            </option>
          );
        })}
      </select>
    </>
  );
};
