import jwtDecode from "jwt-decode";

export async function authPage(rank) {
  if (rank != "any") {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
    const user = jwtDecode(token);
    if (user.rank != rank) {
      window.location.href = "/";
    }
  }
}
