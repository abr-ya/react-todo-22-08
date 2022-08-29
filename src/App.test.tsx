import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App on main page", () => {
  render(<App />);
  const reactElement = screen.getByText(/app/i);
  expect(reactElement).toBeInTheDocument();
});
