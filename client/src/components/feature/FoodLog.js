import { FoodAccordionWrapper } from "./FoodAccordionWrapper";
export const FoodLog = ({ loggedFoods, deleteFood }) => {
  const containerId = "foodLog";
  return (
    <div className="accordion d-flex flex-column" id={FoodLog}>
      {loggedFoods?.map((food) => {
        return (
          <FoodAccordionWrapper
            key={food._id}
            parentId={containerId}
            food={food}
            deleteFood={deleteFood}
          />
        );
      })}
    </div>
  );
};
