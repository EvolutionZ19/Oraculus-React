import { Link } from "react-router-dom";
import Header from "./header";




function Error404() {
  return (
    <>
        <Header />
        <section id="notFound">
        <h1>404</h1>
        <p>Oups ! La page que vous demandez n'existe pas.  </p>
        <Link to="/">Retour sur la page d'acceuil</Link>

        </section>
       
    </>
    
  );
}

export default Error404;