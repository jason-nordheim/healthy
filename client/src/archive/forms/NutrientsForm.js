import { TextInput } from "./input/TextInput";
import { Label } from "./Label";

export const NutrientsForm = ({ nutrients, onNutrientChange }) => {
  const nutrientArray = Object.entries(nutrients);

  return (
    <>
      {nutrientArray.map((val) => {
        const key = val[0];
        const { name, unit, value } = val[1];
        return (
          <div key={key} className="col-sm-auto">
            <span className="input-group my-1">
              <Label label={name} for={key} inputText={true} />
              <TextInput
                id={key}
                name={key}
                value={value}
                placeholder={name}
                onChange={onNutrientChange}
              />
              <Label label={unit} inputText={true} />
            </span>
          </div>
        );
      })}
    </>
  );
};
