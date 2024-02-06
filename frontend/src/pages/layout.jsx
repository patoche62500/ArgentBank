import Header from "../components/header/header";
import Footer from "../components/footer/footer";
/* Rajoute a l'interieur du contenue */
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
