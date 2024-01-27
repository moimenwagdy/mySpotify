import { RouterProvider } from "react-router-dom";
import { queryClient } from "./utllties/queryClient";
import route from "./Routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}></RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
