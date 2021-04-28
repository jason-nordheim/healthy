import { CONSTANTS } from "../../../config";

import { GiMineralHeart } from "react-icons/gi/index";

const { AppName } = CONSTANTS;
export const Brand = () => {
  return (
    <>
      <a className="navbar-brand" href="/">
        <abbr title={AppName} style={{ cursor: "pointer" }}>
          <GiMineralHeart size="24px" />
        </abbr>
      </a>
    </>
  );
};
