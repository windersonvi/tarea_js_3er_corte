import React, { useState } from "react";

const edit= () => {
    // Define el estado para guardar los datos del registro
    const [data, setData] = useState({});
    // Obtiene el ID del registro de la URL
    const id = parseInt(window.location.pathname.split("/")[2]);
    // Obtiene los datos del registro de la base de datos
    async function getData() {
        // Usa fetch para hacer una petición GET al endpoint read
        const response = await fetch(`http://localhost:5000/read/${id}`);
        // Convierte la respuesta en un objeto JSON
        const jsonData = await response.json();
        // Guarda los datos en el estado
        setData(jsonData.posts[0]);
    }

    // Usa useEffect para llamar a la función getData cuando se monta el componente
    useEffect(() => {
        getData();
    }, []);

    function saveData() {
        const data = {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          carro: this.state.carro,
        };
        const url = "http://localhost:5000/update";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        fetch(url, options)
          .then(() => {
            alert("Los datos se actualizaron correctamente");
          })
          .catch((error) => {
            alert("Error al actualizar los datos: " + error.message);
          });
      }
    return (
        <>
            <h1>Editar registro</h1>
            <input type="text" value={data.nombre} onChange={(e) => setData({ nombre: e.target.value })} />
            <input type="text" value={data.apellido} onChange={(e) => setData({ apellido: e.target.value })} />
            <input type="text" value={data.carro} onChange={(e) => setData({ carro: e.target.value })} />
            <button type="button" onClick={() => saveData()}>Guardar</button>
        </>
    );
};

export default edit;