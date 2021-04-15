import { useState } from "react";
import { TextInput } from "./input/TextInput";
import { Select } from "./select/Select";
import { Label } from "./Label";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  NUTRIENTS,
} from "../../config/edaman.api.config";
import { capitalize } from "../../util/textUtils";
import { NutrientsForm } from "./NutrientsForm";

export const ManualFoodForm = () => {
  const [food, setFood] = useState({
    label: "",
    category: "",
    categoryLabel: "",
    nutrients: NUTRIENTS,
  });

  const handleSubmitFood = (e) => {
    e.preventDefault();
  };
  const handleValueChange = (e) => {
    const { value, name } = e.target;
    setFood({
      ...food,
      [name]: value,
    });
  };
  const handleNutrientChange = (e) => {
    const { id, name, value } = e.target;
    setFood({
      ...food,
      nutrients: { ...food.nutrients, [name]: { ...NUTRIENTS[name], value } },
    });
  };
  const { label, category, categoryLabel, nutrients } = food;

  console.log(nutrients);

  return (
    <form className="card p-2" onSubmit={handleSubmitFood}>
      <div className="row">
        <div className="col-sm-auto text-center">
          <p>Food</p>
          <hr />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-auto">
          <span className="input-group mb-1">
            <Label label="Label" name="label" inputText={true} />
            <TextInput
              for="label"
              name="label"
              placeholder="Food Name"
              id="label"
              value={label}
              onChange={handleValueChange}
            />
          </span>
        </div>
        <div className="col-sm-auto">
          <span className="input-group mb-1">
            <Label label="Category" name="category" inputText={true} />
            <Select
              name="category"
              id="category"
              value={category}
              onChange={handleValueChange}
              selectOptions={CATEGORIES.map((c, i) => ({
                id: i,
                key: c.category,
                value: capitalize(c.category),
              }))}
            />
          </span>
        </div>
        <div className="col-sm-auto">
          <span className="input-group">
            <Label label="Type" name="categoryLabel" inputText={true} />
            <Select
              name="categoryLabel"
              id="categoryLabel"
              value={categoryLabel}
              onChange={handleValueChange}
              selectOptions={CATEGORY_LABELS.map((c, i) => ({
                id: i,
                key: c.label,
                value: capitalize(c.label),
              }))}
            />
          </span>
        </div>
      </div>
      <NutrientsForm
        nutrients={nutrients}
        onNutrientChange={handleNutrientChange}
      />
      <div className="row">
        <div className="col-sm-auto text-center">
          <button className="btn btn-primary px-4" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
