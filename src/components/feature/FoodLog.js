import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { getFoods } from "../../util/ApiUtils";
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
