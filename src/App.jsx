import "./App.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Navigation } from "./containers/Navigation.jsx";
import { RedirectRouter } from "./containers/RedirectRouter.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <RedirectRouter />
    </AuthProvider>
  );
};
