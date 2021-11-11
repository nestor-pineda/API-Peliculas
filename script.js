"use strict";

let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// Pagianción
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3c0e4d0681f169ad96d461aa73f15f72&language=es-ES&page=${pagina}`);
    // console.log(respuesta);

    // Comprueba si la respuesta es correcta
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
        <figure class="hover-rotate poster">
          <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
        </figure>
        
        <h3 class="titulo">${pelicula.title}</h3>
      </div>
        `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("Se ha producidoun error con el servidor. Revisa!");
    } else if (respuesta.status === 404) {
      console.log("La pelicula no existe");
    } else {
      console.log("Se ha producido un error que desconocemos");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
