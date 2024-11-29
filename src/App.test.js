import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders the app title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Ejemplo CRUD con React/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("adds a new user", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), {
      target: { value: "28" },
    });

    fireEvent.click(screen.getByText(/Agregar/i));

    const userElement = screen.getByText(/Carlos - 28 años/i);
    expect(userElement).toBeInTheDocument();
  });

  test("edits an existing user", async () => {
    render(<App />);

    // Buscar el botón "Editar" del primer usuario
    const editButton = screen.getAllByRole('button', { name: /Editar/i })[0]; 
    fireEvent.click(editButton);

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Juanito" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), {
      target: { value: "26" },
    });

    fireEvent.click(screen.getByRole('button', { name: /Actualizar/i }));

    // Esperar a que el usuario se actualice en el DOM
    const updatedUserElement = await screen.findByText(/Juanito - 26 años/i);
    expect(updatedUserElement).toBeInTheDocument();
  });

  test("deletes a user", async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), {
      target: { value: "28" },
    });
    fireEvent.click(screen.getByText(/Agregar/i));

    // Buscar el botón "Eliminar" del usuario que acabamos de agregar
    const userListItem = await screen.findByText(/Carlos - 28 años/i);
    const deleteButton = within(userListItem).getByRole('button', { name: /Eliminar/i });

    fireEvent.click(deleteButton);

    // Esperar a que el usuario se elimine del DOM
    await waitFor(() => {
      expect(screen.queryByText(/Carlos - 28 años/i)).not.toBeInTheDocument();
    });
  });
  test("calculates average age correctly", () => {
    render(<App />);

    // Agregar algunos usuarios
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), {
      target: { value: "28" },
    });
    fireEvent.click(screen.getByText(/Agregar/i));

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), {
      target: { value: "35" },
    });
    fireEvent.click(screen.getByText(/Agregar/i));

    // Verificar la edad promedio
    const averageAgeElement = screen.getByText(/Edad Promedio:/i);
    expect(averageAgeElement).toHaveTextContent("Edad Promedio: 31.5"); // (28 + 35) / 2 = 31.5
  });
  
});