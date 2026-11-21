import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";

const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    stockStatus: "In stock",
    price: 4500,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    category: "Electronics",
    stockStatus: "In stock",
    price: 8900,
  },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Products portal", () => {
  it("shows loading text before rendering products", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(sampleProducts),
      })
    );

    window.history.pushState({}, "", "/products");
    render(<App />);

    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Smart Watch Pro")).toBeInTheDocument();
  });

  it("shows 404 screen for unknown routes", () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    );

    window.history.pushState({}, "", "/does-not-exist");
    render(<App />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });

  it("updates product price when admin saves changes", async () => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "PATCH") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...sampleProducts[0], price: 5000 }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(sampleProducts),
      });
    });

    window.history.pushState({}, "", "/products");
    render(<App />);

    await screen.findByText("Wireless Headphones");

    fireEvent.click(screen.getAllByText("Edit")[0]);

    const priceField = screen.getByLabelText("Edit price");
    fireEvent.change(priceField, { target: { value: "5000" } });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("KSh 5,000")).toBeInTheDocument();
    });
  });
});