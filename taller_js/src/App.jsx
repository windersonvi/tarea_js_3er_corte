import Header from "./components/header/header";
import Formulario from "./components/formulario/formulario"
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  async function getData() {
    const response = await fetch("http://localhost:5000/read");
    const jsonData = await response.json();
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

  function updateData(id, newValue) {
    const url = "http://localhost:5000/update";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id, ...newValue })
    };
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  function handleEdit(id) {
    const newNombre = prompt("Por favor, introduce el nuevo nombre:");
    const newApellido = prompt("Por favor, introduce el nuevo apellido:");
    const newCarro = prompt("Por favor, introduce el nuevo carro:");
    if (newNombre !== null && newApellido !== null && newCarro !== null) {
      updateData(id, {nombre: newNombre, apellido: newApellido, carro: newCarro});
    }
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
                <td>
                <button onClick={() => handleEdit(row.id)}>Editar</button>
                </td>
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
