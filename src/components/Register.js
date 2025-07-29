import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await axios.post("https://localhost:7050/api/Admin", {
        nombre,
        correo,
        clave,
      });

      if (response.status === 200) {
        setMensaje("Usuario registrado exitosamente.");
        // Puedes redirigir si deseas
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Error de conexión con el servidor.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>
        <h3 className="mb-3 text-center text-success">Registro de Administrador</h3>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="clave" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
