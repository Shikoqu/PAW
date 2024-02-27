import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authProvider";

export default function PrivateRoute({ rolesAllowed, children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  if (!isAuthenticated) {
    navigate("/auth/signin");
    return null;
  }

  if (rolesAllowed && !rolesAllowed.includes(user.role)) {
    navigate("");
    return null;
  }

  return children;
}
