export const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Desplaza una altura igual a la altura de la pantalla
      behavior: 'smooth', // Desplazamiento suave
    });
  };