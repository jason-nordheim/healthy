import { useRouteMatch, Link, Switch } from "react-router-dom";

export const ToolsPage = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="container">
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
      </ul>
      <Switch></Switch>
    </div>
  );
};
