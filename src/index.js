import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Chat from "./routes/chat";
import Invoices from "./routes/invoices";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="chat" element={<Chat />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>
);