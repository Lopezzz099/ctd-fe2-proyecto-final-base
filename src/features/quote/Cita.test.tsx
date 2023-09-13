import { server } from "../../test/mocks/server";
import { screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from "./constants";
import { renderWithProviders } from "../../test/renderWithProviders";
import userEvent from "@testing-library/user-event";
import { randomQuote } from "../../test/mocks/handlers";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Cita component", () => {
  describe("Cuando el componente se carga por defecto", () => {
    it("Debería renderizarse correctamente", () => {
      // Renderiza el componente
      renderWithProviders(<Cita />);
    });
    it('Debería mostrar el mensaje "No se encontró ninguna cotización"', () => {
      renderWithProviders(<Cita />);
      // Verifica que el texto "No se encontro ninguna cita" este cuando se renderice
      expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument();
    });
  });
  describe("Cuando el usuario no completa el input y clickea el boton de obtener cita aleatoria", () => {
    it("Debería mostrar un mensaje de carga mientras trae los datos", async () => {
      renderWithProviders(<Cita />);
      // Encuentra y hace click en el botón "Obtener cita aleatoria"
      const obtenerCitaAleatoriaButton = screen.getByText(
        "Obtener cita aleatoria"
      );
      userEvent.click(obtenerCitaAleatoriaButton);

      // Verifica que se muestre un mensaje de carga
      await waitFor(() => {
        expect(screen.getByText(MENSAJE_CARGANDO)).toBeInTheDocument();
      });
    });
    it("Deberia de mostrar una cita aleatoria", async () => {
      renderWithProviders(<Cita />);

      const obtenerCitaAleatoriaButton = screen.getByText(
        "Obtener cita aleatoria"
      );
      await userEvent.click(obtenerCitaAleatoriaButton);

      // Verifica que se muestre la cita random
      await waitFor(() => {
        expect(screen.getByText(randomQuote.quote)).toBeInTheDocument();
      });
    });
  });
  describe("Cuando el usuario pone el nombre de un personaje en el input y clickea el boton de obtener cita", () => {
    it("Deberia mostrar una cita si el nombre es valido", async () => {
      renderWithProviders(<Cita />);

      // Encuentra el input
      const inputNombre = screen.getByLabelText("Author Cita");

      // Ingresa el nombre valido
      userEvent.type(inputNombre, randomQuote.character);

      const obtenerCitaButton = screen.getByLabelText(/Obtener cita/i);

      userEvent.click(obtenerCitaButton);

      // Espera a que la cita se muestre en la pantalla
      await waitFor(() => {
        expect(screen.getByText(randomQuote.quote)).toBeInTheDocument();
      });
    });
    it("Debería mostrar un mensaje de error si el nombre es invalido", async () => {
      renderWithProviders(<Cita />);

      // Encuentra el input
      const inputNombre = screen.getByLabelText("Author Cita");

      // Ingresa el nombre invalido
      await userEvent.type(inputNombre, "paloma");

      const obtenerCitaButton = screen.getByLabelText(/Obtener cita/i);

      await userEvent.click(obtenerCitaButton);

      // Espera a que la cita se muestre en la pantalla
      await waitFor(() => {
        expect(screen.getByText(NOMBRE_INVALIDO)).toBeInTheDocument();
      });
    });
    it("Debería mostrar un mensaje de error si lo que ingreso es un numero", async () => {
      renderWithProviders(<Cita />);

      const inputNombre = screen.getByLabelText("Author Cita");

      // Ingresa el numero
      await userEvent.type(inputNombre, "1");

      const obtenerCitaButton = screen.getByLabelText(/Obtener cita/i);

      await userEvent.click(obtenerCitaButton);

      // Espera a que la cita se muestre en la pantalla
      await waitFor(() => {
        expect(screen.getByText(NOMBRE_INVALIDO)).toBeInTheDocument();
      });
    });
  });
  describe("Cuando ya tiene una cita y el usuario clikea el boton de borrar", () => {
    it("Deberia de eliminar la cita mostrada", async () => {
      renderWithProviders(<Cita />);

      const inputNombre = screen.getByLabelText("Author Cita");

      await userEvent.type(inputNombre, randomQuote.character);

      const obtenerCitaButton = screen.getByLabelText(/Obtener cita/i);

      await userEvent.click(obtenerCitaButton);

      // Encuentra y hace click en el botón "Borrar"
      const obtenerBorrarButton = screen.getByLabelText(/Borrar/i);

      await userEvent.click(obtenerBorrarButton);

      await waitFor(() => {
        expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument();
      });
    });
  });
});
