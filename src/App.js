import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);

  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    if (busqueda === '') return;

    const consultarApi = async () => {

      const imagenesPorPagina = 30;
      const key = '1732750-d45b5378879d1e877cd1d35a6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});
    }

    consultarApi();


  }, [busqueda,paginaactual])

  //definir la pagina anterior 
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />


        {
          (paginaactual === 1) ? null :
            (
              <button
                type="button"
                className="btn btn-info mr-1"
                onClick={paginaAnterior}
              >
                Anterior &laquo;
              </button>
            )

        }

        {
          (paginaactual === totalpaginas) ? null :
            (
              <button
                type="button"
                className="btn btn-info"
                onClick={paginaSiguiente}
              >
                Siguiente &raquo;
              </button>
            )
        }




      </div>

    </div>
  );
}

export default App;
