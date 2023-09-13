import styled from "styled-components"; 

  /* Estilos para el contenedor de la sección de biografía */
const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

  /* Estilos para la imagen de la biografía */
const BioImagen = styled.img`
  max-width: 200px;
  max-height: 300px;
  margin-bottom: 1rem;
`;

  /* Estilos para el nombre de la biografía */
const BioNombre = styled.h3`
  font-size: 2em;
  margin-bottom: 1rem;
`;

  /* Estilos para la descripción de la biografía */
const BioDescripcion = styled.p`
  font-size: 1.3em;
  width: 70%;
  margin: 1rem auto;
`;

  /* Estilos para el contenedor de botones */
const ContenedorBotones = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

  /* Estilos para los botones de alternar biografía */
const BotonBio = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#fdd835" : "")};
  color: ${(props) => (props.isActive ? "whitesmoke" : "")};
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 1rem;
  margin: 1rem;
  font-family: "Homer Simpson Revised", sans-serif;
  font-size: 1.4rem;
  text-shadow: ${(props) => (props.isActive ? `2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
    -2px 0px 0 #000000, 0px -2px 0 #000000;` : "")};

  &:hover {
    cursor: pointer;
  }
`;

export {BotonBio, BioContainer, ContenedorBotones, BioDescripcion, BioNombre, BioImagen};