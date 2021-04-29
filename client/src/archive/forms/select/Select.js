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

export const CASING = {
  default: "default",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};
export const Select = ({
  id,
  name,
  value,
  onChange,
  required = false,
  casing = CASING.default,
  selectOptions,
  disabled = false,
}) => {
  validateSelectOptions(selectOptions);

  const Options = () =>
    selectOptions.map((opt) => {
      const classes = [];
      if (opt.id === value) classes.push("selected");
      if (casing === CASING.uppercase) classes.push("text-uppercase");
      if (casing === CASING.lowercase) classes.push("text-lowercase");
      if (casing === CASING.capitalize) classes.push("text-capitalize");
      return (
        <option
          key={opt.id}
          id={opt.id}
          value={opt.value}
          className={classes.join(" ")}
        >
          {opt.value}
        </option>
      );
    });

  return (
    <>
      <select
        key={id}
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="form-select"
        disabled={disabled}
      >
        <Options />
      </select>
    </>
  );
};
