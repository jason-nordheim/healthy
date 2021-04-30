import { useAuthContext } from "../../../context/context.auth";
import { Authenticated } from "./Authenticated";
import { UnAuthenticated } from "./UnAuthenticated";

export const AccountPage = () => {
  const { state } = useAuthContext();
  return (
    <div className="container">
      {state && state.token ? <Authenticated /> : <UnAuthenticated />}
    </div>
  );
};
