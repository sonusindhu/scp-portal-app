import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
const Home = () => {
  const user = AuthService.getCurrentUser();

  if (user) {
    return <Navigate to="/app/company/list" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default Home;
