import MainLayout from "./component/layout/MainLayout";
import ProtectedRoute from "./component/layout/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </div>
  );
};

export default App;
