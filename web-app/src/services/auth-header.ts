export default function authHeader() {
  const userAuth = localStorage.getItem("user");
  const user = userAuth ? JSON.parse(userAuth) : null;

  if (user && user.token) {
    return { token: user.token }; // Let TypeScript infer the type
  } else {
    return {};
  }
}