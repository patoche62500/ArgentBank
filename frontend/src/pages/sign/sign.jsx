import { redirect, Form } from "react-router-dom";
import "./sign.scss";

export default function Sign() {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form id="formulaire" method="post">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="rememberMe" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </Form>
      </section>
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData.entries());

  console.log("FormData Object:", data);

  const user = {
    email: data.username,
    password: data.password,
  };

  console.log(request);

  const login = await loginUser(user);

  return login ? redirect("/user") : null;
}

async function loginUser(user) {
  const userData = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  //console.log(userData);
  const userDataJson = await userData.json();
  //console.log(userDataJson.body.token);

  // response correcte de la par du server
  if (userData.ok) {
    window.localStorage.setItem("userId", userDataJson.body.token);

    return true;
    //console.log(userDataJson.userId, userDataJson.token);
  } else {
    //console.log("error login");
    return false;
  }
}
