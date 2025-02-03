import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import RomanNumeralConverter from "../components/romanNumeralConverter";

// Utility function to wrap the component with <Provider>
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <Provider theme={defaultTheme}>
      {ui}
    </Provider>
  );
};

describe("RomanNumeralConverter Component", () => {
  test("renders correctly", () => {
    renderWithProvider(<RomanNumeralConverter />);
    expect(screen.getByText(/roman numeral converter/i)).toBeInTheDocument();
  });

  test("displays error when input is invalid", async () => {
    renderWithProvider(<RomanNumeralConverter />);
    const input = screen.getByLabelText(/enter a number/i);
    fireEvent.change(input, { target: { value: "" } });

    expect(await screen.findByText(/enter a number/i)).toBeInTheDocument();
  });

  test("displays error for out-of-range numbers", async () => {
    renderWithProvider(<RomanNumeralConverter />);
    const input = screen.getByLabelText(/enter a number/i);
    const button = screen.getByText(/convert to roman numeral/i);
    fireEvent.change(input, { target: { value: "5000" } });
    fireEvent.blur(input);
    fireEvent.click(button);

    expect(await screen.findByText(/number must be between 1 and 3999/i)).toBeInTheDocument();
  });

test("calls API and updates result on valid input", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ input: "10", output: "X" }), 
    })
  ) as jest.Mock;

  renderWithProvider(<RomanNumeralConverter />);
  const input = screen.getByLabelText(/enter a number/i);
  const button = screen.getByText(/convert to roman numeral/i);

  fireEvent.change(input, { target: { value: "10" } }); 
  fireEvent.blur(input); 
  fireEvent.click(button);

  expect(await screen.findByText(/Roman numeral: X/i)).toBeInTheDocument();
});


  test("handles API failure gracefully", async () => {
    // Mock fetch to return a failed response
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    renderWithProvider(<RomanNumeralConverter />);
    const input = screen.getByLabelText(/enter a number/i);
    const button = screen.getByText(/convert to roman numeral/i);

    fireEvent.change(input, { target: { value: 10 }});
    fireEvent.blur(input);
    fireEvent.click(button);

    expect(await screen.findByText(/something went wrong while fetching the conversion/i)).toBeInTheDocument();
  });
});
