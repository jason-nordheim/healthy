import { Food } from "./Food";
export const FoodLog = ({ loggedFoods, deleteFood }) => {
  return (
    <div>
      {loggedFoods?.map((food) => {
        return (
          <Food
            key={food._id}
            food={food}
            foodActionHandler={() => deleteFood(food)}
            foodActionLabel={"Remove"}
          />
        );
      })}
    </div>
  );
};
