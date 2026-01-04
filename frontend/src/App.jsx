import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SessionProvider } from "./context/SessionContext";
function App() {
  return (
    <div className="h-screen bg-slate-100">
      <div className="flex justify-center items-center h-screen">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
