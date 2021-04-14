import { Label } from "./forms/Label";
import { TextInput } from "./forms/input/TextInput";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi/index";
import { searchFoods } from "../util/ApiUtils";
import { Food } from "./feature/Food";

export const FoodLogContainer = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchFoods = (e) => {
    e.preventDefault();

    // prevent searches if less than 3 characters are entered
    if (!searchText || searchText.length < 3) {
      return alert("Please enter more than 3 characters to perform search");
    }

    searchFoods(searchText).then((data) => {
      setSearchResults(data.hints);
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-auto">
          <form onSubmit={handleSearchFoods}>
            <span className="input-group">
              <Label label="Search" name="searchText" inputText={true} />
              <TextInput
                name="searchText"
                for="searchText"
                id="searchText"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-secondary my-auto mx-auto p-2"
                onClick={handleSearchFoods}
              >
                <BiSearchAlt className="pl-4" />
              </button>
            </span>
          </form>
        </div>
        <div className="col-sm-auto mt-3">
          {searchResults &&
            searchResults.length > 1 &&
            searchResults.map((item, index) => (
              <Food key={`${item.food.foodId}${index}`} food={item.food} />
            ))}
        </div>
      </div>
    </div>
  );
};
