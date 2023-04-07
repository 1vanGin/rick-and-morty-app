import "./App.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Navigation } from "./containers/Navigation";
import { RedirectRouter } from "./containers/RedirectRouter.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <RedirectRouter />
    </AuthProvider>
  );
};
