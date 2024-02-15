import "./account.scss";

export default function Account({ donnees }) {
  //console.log(donnees);
  return (
    <>
      <div className="account-content-wrapper">
        <h3 className="account-title">{donnees[0]?.h3}</h3>
        <p className="account-amount">{donnees[1]?.p}</p>
        <p className="account-amount-description">{donnees[2]?.p2}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </>
  );
}
