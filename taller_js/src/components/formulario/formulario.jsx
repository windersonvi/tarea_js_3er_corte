import React, { useState } from "react";

function Formulario() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [carro, setCarro] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido, carro }),
        };

        fetch("http://localhost:5000/create", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "OK") {
                    setMensaje("El cliente se creó correctamente");
                } else {
                    setMensaje("Ocurrió un error al crear el cliente");
                }
            })
            .catch((error) => {
                setMensaje("Refresca la pagina para ver la nueva tabla");
            });
    };

    // Define la función que se ejecuta al cambiar el valor de los campos
    const handleChange = (e) => {
        // Actualiza el estado del campo según su nombre
        switch (e.target.name) {
            case "nombre":
                setNombre(e.target.value);
                break;
            case "apellido":
                setApellido(e.target.value);
                break;
            case "carro":
                setCarro(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <center>
                <h3 >Crear Cliente</h3>
            </center>
            <form onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input className="form-control" type="text" id="nombre" name="nombre" value={nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Apellido:</label>
                    <input className="form-control" type="text" id="apellido" name="apellido" value={apellido} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Carro:</label>
                    <input className="form-control" type="text" id="carro" name="carro" value={carro} onChange={handleChange} required />
                </div>
                <center>
                    <button className="btn btn-danger" type="submit">Crear</button>
                </center>
            </form>
            <p>{mensaje}</p>
        </div>
    );
}

export default Formulario;