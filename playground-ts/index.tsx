import { createRoot } from "react-dom/client";

const Button = ({ color, label = 'default label' }) => (
  <button style={{ backgroundColor: color }}>{label}</button>
);

const App = () => (
  <div>
    <Button label="Button" />
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
