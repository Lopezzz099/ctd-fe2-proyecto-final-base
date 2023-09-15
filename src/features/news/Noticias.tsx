import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

// Principio de Responsabilidad Única (SRP) y Principio de Inversión de Dependencia (DIP)

interface NoticiaProps {
  noticia: INoticiasNormalizadas;
  onClick: () => void;
}

const Noticia = ({ noticia, onClick }: NoticiaProps) => {
  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>{noticia.descripcionCorta}</DescripcionTarjetaNoticia>
      <BotonLectura onClick={onClick}>Ver más</BotonLectura>
    </TarjetaNoticia>
  );
};

interface ModalProps {
  noticia: INoticiasNormalizadas;
  onClose: () => void;
}

const Modal = ({ noticia, onClose }: ModalProps) => {
  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton onClick={onClose}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        {noticia.esPremium ? (
          <>
            <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
            <CotenedorTexto>
              <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
              <DescripcionModal>
                Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
              </DescripcionModal>
              <BotonSuscribir
                onClick={() =>
                  setTimeout(() => {
                    alert("Suscripto!");
                    onClose();
                  }, 1000)
                }
              >
                Suscríbete
              </BotonSuscribir>
            </CotenedorTexto>
          </>
        ) : (
          <>
            <ImagenModal src={noticia.imagen} alt="news-image" />
            <CotenedorTexto>
              <TituloModal>{noticia.titulo}</TituloModal>
              <DescripcionModal>{noticia.descripcion}</DescripcionModal>
            </CotenedorTexto>
          </>
        )}
      </TarjetaModal>
    </ContenedorModal>
  );
};

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modalNoticia, setModalNoticia] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => ({
        id: n.id,
        titulo: n.titulo
          .split(" ")
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(" "),
        descripcion: n.descripcion,
        fecha: `Hace ${Math.floor((new Date().getTime() - n.fecha.getTime()) / 60000)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      }));

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <Noticia key={n.id} noticia={n} onClick={() => setModalNoticia(n)} />
        ))}
        {modalNoticia && (
          <Modal noticia={modalNoticia} onClose={() => setModalNoticia(null)} />
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
