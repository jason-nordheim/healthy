import { Label } from "../forms/Label";
import { TextInput } from "../forms/input/TextInput";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi/index";
import { searchFoods } from "../../util/ApiUtils";
import { Food } from "./Food";

export const FoodSearch = ({ addFood }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearchFoods = (e) => {
    e.preventDefault();
    setMessage(""); // clear any messages

    // prevent searches if less than 3 characters are entered
    if (!searchText || searchText.length < 3) {
      return alert("Please enter more than 3 characters to perform search");
    }

    searchFoods(searchText).then((data) => {
      setSearchResults(data.hints);

      // no results means that we didn't match anything
      if (data.hints.length === 0) {
        setMessage(`No food matched "${searchText}"`);
      }
    });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
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
                className="btn btn-secondary my-auto mx-auto px-3"
                onClick={handleSearchFoods}
              >
                <BiSearchAlt style={{ fontSize: "24px" }} />
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
          {message && <p className="mx-auto">{message}</p>}
        </div>
      </div>
    </div>
  );
};
