import "./featureItem.scss";

export default function FeatureItem({ donnee }) {
  if (!donnee) {
    return;
  }
  // console.log(donnee);
  return (
    <>
      <img src={donnee[0]?.src} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{donnee[1]?.h3}</h3>
      <p>{donnee[2]?.p}</p>
    </>
  );
}
