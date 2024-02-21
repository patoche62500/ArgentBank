import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, Navigate } from "react-router-dom";
import { setName, setLogin } from "../../features/userProfile";
import Account from "../../components/account/account";

import "./user.scss";

export default function User() {
  const dispatch = useDispatch();
  const [donnees, setDonnees] = useState(null);
  const [bdisplayFormEdit, setbdisplayFormEdit] = useState(false);
  // recupere l'user dans le store depuis la variable user
  const userProfile = useSelector((state) => state.user.user);
  const login = useSelector((state) => state.user.bIsLogin);

  //console.log(login);
  //console.log(userProfile);

  if (!login) {
    //console.log("redirect");
    return <Navigate to="/" />;
  }
  //console.log(user);

  useEffect(() => {
    // Fonction asynchrone pour charger les données
    const chargerDonnees = async () => {
      try {
        // Chargez le fichier JSON
        const reponse = await fetch("/datas/dataAccount.json");

        if (!reponse.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }

        // Convertissez la réponse en JSON
        const donneesJSON = await reponse.json();
        //console.log("Données récupérées :", donneesJSON);

        // Mettez à jour l'état avec les données récupérées
        setDonnees(donneesJSON);
      } catch (erreur) {
        console.error("Erreur :", erreur);
      }
    };

    // Appelez la fonction asynchrone pour charger les données

    chargerDonnees();
    //dispatch(setLogin(true));
  }, []);

  async function handleChange(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const updatedUser = {
      userName: data.userProfile,
    };

    const update = await updateUser(updatedUser);

    if (update) {
      setbdisplayFormEdit(false);
    } else {
      console.error("La mise à jour a échoué.");
      // Gérer le cas où la mise à jour a échoué, par exemple, en affichant un message à l'utilisateur
    }
  }

  async function updateUser(user) {
    try {
      // Effectuez une requête pour mettre à jour l'utilisateur
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Autres en-têtes nécessaires (peut inclure le jeton d'authentification, etc.)
            Authorization: `Bearer ${window.localStorage.getItem("userId")}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        console.error("Échec de la mise à jour :", response.statusText);
        return false;
      }
      dispatch(setName(user.userName));
      console.log("updated", user);
      // La mise à jour est réussie
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return false;
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userProfile && `${userProfile.firstName} ${userProfile.lastName}!`}
        </h1>
        {bdisplayFormEdit ? (
          <>
            <form id="formulaire" onSubmit={handleChange}>
              <ul className="form">
                <li>Edit user Info</li>
                <li>
                  <label htmlFor="userProfile">User name:</label>
                  <input type="text" id="userProfile" name="userProfile" />
                </li>
                <li>
                  <label htmlFor="firstName">First name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userProfile.firstName}
                    disabled
                  />
                </li>
                <li>
                  <label htmlFor="lastName">Last name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userProfile.lastName}
                    disabled
                  />
                </li>
                <li>
                  <input className="edit-button" type="submit" value="Save" />
                  <button
                    className="edit-button"
                    onClick={() => setbdisplayFormEdit(false)}
                  >
                    Cancel
                  </button>
                </li>
              </ul>
            </form>
          </>
        ) : (
          <button
            className="edit-button"
            onClick={() => setbdisplayFormEdit(true)}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {donnees?.map((e, idx) => (
        <section className="account" key={`Account_${idx + 1}`}>
          <Account donnees={e.Account} />
        </section>
      ))}
    </main>
  );
}
