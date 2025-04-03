import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import NavBar from "../components/navbar.jsx";
import Drawer from "../components/drawer.jsx";

// Pour les pages
import ListeCat from "../components/listecat.jsx";
import AjouterCat from "../components/ajoutercat.jsx";
import AjouterProduit from "../components/ajouterproduit.jsx";
import ListeProduit from "../components/listeproduit.jsx";
import AjouterFacture from "../components/ajouterfacture.jsx";
import ListeFacture from "../components/listefacture.jsx";
import FactureProforma from "../components/factureProforma.jsx";
import ListeClient from "../components/listeclient.jsx"; // Imported ListeClient
import AjouterClient from "../components/ajouterclient.jsx"; // Imported AjouterClient
import toast from "react-hot-toast";

function Accueil({ tokens, setTokens }) {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  
  // Redirection si l'ID ne correspond pas au token
  if (id !== tokens.token) {
    return <Navigate to="/" replace />;
  }

  const [liste, setListe] = useState([]); // Catégories
  const [listproduit, setListeproduit] = useState([]); // Produits
  const [clients, setClients] = useState([]); // Clients
  const [page, setPage] = useState(0); // Gestion de la page active
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Gestion de la visibilité du drawer

  // Fonction pour charger les données depuis l'API
  const fetchData = async (url, setData, errorMessage) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setData(data.data); // Mise à jour de l'état
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  // Charger les catégories
  useEffect(() => {
    fetchData(
      "https://api.trendybox-dz.com/CategorieAll",
      setListe,
      "Erreur lors de la récupération des catégories."
    );
  }, []);

  // Charger les produits
  useEffect(() => {
    fetchData(
      "https://api.trendybox-dz.com/ProduitAll",
      setListeproduit,
      "Erreur lors de la récupération des produits."
    );
  }, []);

  // Charger les clients
  useEffect(() => {
    fetchData(
      "https://api.trendybox-dz.com/ClientAll", // Replace with actual endpoint if different
      setClients,
      "Erreur lors de la récupération des clients."
    );
  }, []);

  return (
    <div className="w-full h-[100vh]">
      {/* Barre de navigation */}
      <NavBar />

      {/* Contenu principal */}
      <div className="w-full flex">
        {/* Drawer (barre latérale) */}
        {isDrawerOpen && <Drawer setPage={setPage} closeDrawer={() => setIsDrawerOpen(false)} />}

        {/* Contenu principal */}
        <div
          style={{
            width: isDrawerOpen ? "calc(100vw - 250px)" : "100vw",
            height: "calc(100vh - 80px)",
            overflow: "auto",
          }}
        >
          {/* Bouton pour rouvrir le drawer */}
          {!isDrawerOpen && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                padding: "10px",
                backgroundColor: "#004d00",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ouvrir le menu
            </button>
          )}

          {/* Rendu conditionnel des composants */}
          {page === 0 && <ListeCat liste={liste} setListe={setListe} />}
          {page === 1 && <AjouterCat fetchData={fetchData} />}
          {page === 2 && <ListeProduit produits={listproduit} />}
          {page === 3 && <AjouterProduit liste={liste} fetchData={fetchData} />}
          {page === 4 && <AjouterFacture listproduit={listproduit} liste={liste} />}
          {page === 5 && <ListeFacture />}
          {page === 6 && <FactureProforma />}
          {page === 7 && <ListeClient clients={clients} setClients={setClients} />}
          {page === 8 && <AjouterClient fetchData={fetchData} />}
        </div>
      </div>
    </div>
  );
}

export default Accueil;