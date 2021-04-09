import { BsToggleOn, BsToggleOff } from "react-icons/bs/index";

export const Toggle = ({
  on = true,
  onClick,
  style = { fontSize: "36px" },
}) => {
  return (
    <div className="col d-flex justify-content-end align-items-center">
      <span className="h1 align-items-center" onClick={onClick}>
        <span
          className="h2 toggle"
          data-toggle="popover"
          data-trigger="hover"
          title="Edit"
          data-content="Click to toggle edit mode"
          style={style}
        >
          {on ? (
            <BsToggleOn aria-label="on" title="toggle" color="green" />
          ) : (
            <BsToggleOff aria-label="off" title="toggle" />
          )}
        </span>
      </span>
    </div>
  );
};
