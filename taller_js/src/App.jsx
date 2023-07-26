import Header from "./components/header/header";
import Formulario from "./components/formulario/formulario"
import React, { useState, useEffect } from "react";

function App() {
  // Define el estado para guardar los datos
  const [data, setData] = useState([]);

  // Define la función para hacer la petición al endpoint
  async function getData() {
    // Usa fetch para hacer una petición GET al endpoint read
    const response = await fetch("http://localhost:5000/read");
    // Convierte la respuesta en un objeto JSON
    const jsonData = await response.json();
    // Guarda los datos en el estado
    setData(jsonData.posts);
  }

  useEffect(() => {
    getData();
  }, []);

  function deleteData(id) {
    const url = "http://localhost:5000/delete";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    };
    return fetch(url, options).then(response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(response.statusText);
      }
    })
  }

  function editData(id) {
    window.location.href = `/edit/${id}`;
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Formulario />
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="row">ID</th>
              <th scope="row">Nombre</th>
              <th scope="row">Apellido</th>
              <th scope="row">Carro</th>
              <th scope="row">Registro</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Editar</th>
              <th scope="col">Ver</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td scope="row">{row.id}</td>
                <td>{row.nombre}</td>
                <td>{row.apellido}</td>
                <td>{row.carro}</td>
                <td>{row.created_at}</td>
                <td>
                  <button type="button" onClick={() => deleteData(row.id)}>
                    Eliminar
                  </button>
                </td>
                <td>Editar</td>
                <td>Ver</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
