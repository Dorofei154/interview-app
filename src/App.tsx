import "./App.css";
import AppRouter from "./providers/AppRouter/AppRouter";
import ErrorBoundaries from "./providers/ErrorBoundaries/ErrorBoundaries";

function App() {
  return (
    <ErrorBoundaries>
      <AppRouter />
    </ErrorBoundaries>
  );
}

export default App;
