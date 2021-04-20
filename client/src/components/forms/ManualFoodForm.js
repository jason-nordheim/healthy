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
    servings: 1,
    servingsPerContainer: 1,
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
    const { name, value } = e.target;
    setFood({
      ...food,
      nutrients: { ...food.nutrients, [name]: { ...NUTRIENTS[name], value } },
    });
  };
  const {
    label,
    category,
    categoryLabel,
    nutrients,
    servings,
    servingsPerContainer,
  } = food;

  console.log(nutrients);

  return (
    <form className="card shadow p-2" onSubmit={handleSubmitFood}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <p>Food</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
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
          <div className="col-sm-6">
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
            <span className="input-group mb-1">
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
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p>Servings</p>
            <hr />
          </div>
          <div className="col d-flex ">
            <span className="input-group">
              <Label label="Servings" name="servings" inputText={true} />
              <TextInput
                for="servings"
                name="servings"
                placeholder="servings"
                id="servings"
                value={servings}
                onChange={handleValueChange}
              />
            </span>
          </div>
          <div className="col d-flex">
            <span className="input-group">
              <Label label="of" name="servingsPerContainer" inputText={true} />
              <TextInput
                for="servingsPerContainer"
                name="servingsPerContainer"
                placeholder="servingsPerContainer"
                id="servingsPerContainer"
                value={servingsPerContainer}
                onChange={handleValueChange}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-auto text-center">
            <p>Nutrients</p>
            <hr />
          </div>
          <NutrientsForm
            nutrients={nutrients}
            onNutrientChange={handleNutrientChange}
          />
        </div>
      </div>
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