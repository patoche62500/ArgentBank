import React, { useState, useEffect } from "react";
// composant
import FeatureItem from "../../components/featureItem/featureItem";
// style page home
import "./home.scss";

export default function Home() {
  const [donnees, setDonnees] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour charger les données
    const chargerDonnees = async () => {
      try {
        // Chargez le fichier JSON
        const reponse = await fetch("/datas/data.json");

        if (!reponse.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }

        // Convertissez la réponse en JSON
        const donneesJSON = await reponse.json();
        // console.log("Données récupérées :", donneesJSON);

        // Mettez à jour l'état avec les données récupérées
        setDonnees(donneesJSON);
      } catch (erreur) {
        console.error("Erreur :", erreur);
      }
    };

    // Appelez la fonction asynchrone pour charger les données
    chargerDonnees();
  }, []);
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* Création de plusieurs composants feature items */}
        {donnees?.map((e, idx) => (
          <div key={idx} className="feature-item">
            <FeatureItem donnee={e.feature} />
          </div>
        ))}
      </section>
    </main>
  );
}
