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
import ListeClient from "../components/listeclient.jsx";
import AjouterClient from "../components/ajouterclient.jsx";
import ListeFour from "../components/listefour.jsx";
import AjouterFour from "../components/ajouterfour.jsx";
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
  const [fournisseurs, setFournisseurs] = useState([]); // Fournisseurs
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
      "https://backendrafik.onrender.com/CategorieAll",
      setListe,
      "Erreur lors de la récupération des catégories."
    );
  }, []);

  // Charger les produits
  useEffect(() => {
    fetchData(
      "https://backendrafik.onrender.com/ProduitAll",
      setListeproduit,
      "Erreur lors de la récupération des produits."
    );
  }, []);

  // Charger les clients
  useEffect(() => {
    fetchData(
<<<<<<< HEAD
      "https://backendrafik.onrender.com/ClientAll", // Replace with actual endpoint if different
=======
      "https://api.trendybox-dz.com/ClientAll",
>>>>>>> 446b95634d54c762883d5ba4e3bd88e3bf0a1d74
      setClients,
      "Erreur lors de la récupération des clients."
    );
  }, []);

  // Charger les fournisseurs
  useEffect(() => {
    fetchData(
      "https://api.trendybox-dz.com/Fournisseurs",
      setFournisseurs,
      "Erreur lors de la récupération des fournisseurs."
    );
  }, []);

  // Rendu conditionnel des pages
  const renderPage = () => {
    switch (page) {
      case 0:
        return <ListeCat liste={liste} setListe={setListe} />;
      case 1:
        return <AjouterCat fetchData={fetchData} />;
      case 2:
        return <ListeProduit produits={listproduit} />;
      case 3:
        return <AjouterProduit liste={liste} fetchData={fetchData} />;
      case 4:
        return <AjouterFacture listproduit={listproduit} liste={liste} />;
      case 5:
        return <ListeFacture />;
      case 6:
        return <FactureProforma />;
      case 7:
        return <ListeClient clients={clients} setClients={setClients} />;
      case 8:
        return <AjouterClient fetchData={fetchData} />;
      case 9:
        return <ListeFour fournisseurs={fournisseurs} setFournisseurs={setFournisseurs} />;
      case 10:
        return <AjouterFour fetchData={fetchData} />;
      default:
        return (
          <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Bienvenue sur votre tableau de bord
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Utilisez le menu à gauche pour gérer vos catégories, produits, clients, fournisseurs, factures et plus encore.
            </p>
          </div>
        );
    }
  };

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

          {/* Rendu des pages */}
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Accueil;