import axios from "axios";

export async function loginAdmin(correo, clave) {
  try {
    const response = await axios.post("https://localhost:7050/api/Admin/login",
      {
        correo,
        clave
      });


    const data = response.data;

    // Guardar en localStorage
    localStorage.setItem("admin", JSON.stringify(data));

    return { success: true, admin: data };
  } catch (error) {
    return { success: false, message: "Credenciales inválidas" };
  }
}

export function logoutAdmin() {
  localStorage.removeItem("admin");
}

export function getAdmin() {
  return JSON.parse(localStorage.getItem("admin"));
}

export function isAuthenticated() {
  return !!localStorage.getItem("admin");
}
