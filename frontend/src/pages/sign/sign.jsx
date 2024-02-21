import { redirect, Form } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLogin } from "../../features/userProfile";
import "./sign.scss";

export default function Sign() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getProfileUser();
        dispatch(setUser(userProfile));
        dispatch(setLogin(true));
        //console.log(user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur :",
          error
        );
        // Gérez les erreurs si nécessaire, par exemple, affichez un message à l'utilisateur
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form method="post">
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

  //console.log("FormData Object:", data);

  const user = {
    email: data.username,
    password: data.password,
  };

  //console.log(request);

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

async function getProfileUser() {
  try {
    const userData = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("userId")}`,
      },
    });

    const userDataJson = await userData.json();

    // Vérifiez la réponse du serveur
    if (userData.ok) {
      console.log("user profile", userDataJson.body);

      // Faites quelque chose avec les données userDataJson si nécessaire
      return userDataJson.body;
      //return true;
    } else {
      console.log("Erreur lors de la récupération du profil utilisateur");
      //return false;
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête :", error);
    // Gérez les erreurs si nécessaire
    //return false;
  }
}
