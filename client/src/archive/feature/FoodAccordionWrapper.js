import { useState } from "react";
import { Food } from "./Food";

export const FoodAccordionWrapper = ({ parentId, food, deleteFood }) => {
    const id = food._id + food.label;
    const heading = food.label;
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div class="accordion-item">
            <h2 class="accordion-header" id={heading}>
                <button
                    class={collapsed ? "accordion-button collapsed" : "accordion-button"}
                    type="button"
                    data-bs-toggle={`collapse`}
                    data-bs-target={`#collapseOne`}
                    aria-expanded={!collapsed}
                    aria-controls={`${id}`}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {food.label}
                </button>
            </h2>
            <div
                id={`${id}`}
                class={collapsed ? "accordion-collapse collapse" : "accordion-collapse show"}
                aria-labelledby={heading}
                data-bs-parent={parentId}
            >
                <div class="accordion-body">
                    <Food
                        food={food}
                        foodActionHandler={() => deleteFood(food)}
                        foodActionLabel={"Remove"} />
                </div>
            </div>
        </div>
    );
};
