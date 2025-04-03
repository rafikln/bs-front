import { useState } from "react";
import toast from "react-hot-toast";

const AjouterFour = ({ fetchData }) => {
  const [fournisseur, setFournisseur] = useState({
    nom: "",
    Niss: "",
    Niff: "",
    Adresse: "",
    email: "",
    telephone: "",
  });

  // Gestion des changements dans les champs d'entrée
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFournisseur((prevFournisseur) => ({
      ...prevFournisseur,
      [id]: value,
    }));
  };

  // Validation simple du formulaire
  const validateForm = () => {
    const { nom, Niss, Niff, Adresse, email, telephone } = fournisseur;
    // Selon votre backend, seul "nom" est requis
    if (!nom) {
      toast.error("Veuillez remplir le champ nom obligatoire !");
      return false;
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Veuillez entrer un email valide !");
      return false;
    }
    return true;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://api.trendybox-dz.com/Fournisseurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: fournisseur.nom.trim(),
          Niss: fournisseur.Niss.trim() || null,
          Niff: fournisseur.Niff.trim() || null,
          Adresse: fournisseur.Adresse.trim() || null,
          email: fournisseur.email.trim() || null,
          telephone: fournisseur.telephone.trim() || null,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Réinitialisation du formulaire
        setFournisseur({
          nom: "",
          Niss: "",
          Niff: "",
          Adresse: "",
          email: "",
          telephone: "",
        });
        toast.success(result.message || "Fournisseur ajouté avec succès !");
        // Recharger les données via fetchData si fourni
        if (fetchData) {
          fetchData(
            "https://api.trendybox-dz.com/Fournisseurs",
            (data) => data.data,
            "Erreur lors de la récupération des fournisseurs."
          );
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Erreur lors de l'ajout du fournisseur.");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <div className="w-full h-[90px] flex justify-between items-center p-[30px]">
        <div className="breadcrumbs text-sm">
          <ul>
            <li className="text-[gray]">
              <a href="/">Accueil</a>
            </li>
            <li className="text-[blue]">
              <a href="/ajouter-fournisseur">Ajouter Fournisseur</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full px-[60px]">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">
                Nom du fournisseur *
              </label>
              <input
                type="text"
                id="nom"
                value={fournisseur.nom}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nom du fournisseur"
                required
              />
            </div>

            {/* Niss */}
            <div>
              <label htmlFor="Niss" className="block mb-2 text-sm font-medium text-gray-900">
                NISS
              </label>
              <input
                type="text"
                id="Niss"
                value={fournisseur.Niss}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="NISS"
              />
            </div>

            {/* Niff */}
            <div>
              <label htmlFor="Niff" className="block mb-2 text-sm font-medium text-gray-900">
                NIFF
              </label>
              <input
                type="text"
                id="Niff"
                value={fournisseur.Niff}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="NIFF"
              />
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="Adresse" className="block mb-2 text-sm font-medium text-gray-900">
                Adresse
              </label>
              <input
                type="text"
                id="Adresse"
                value={fournisseur.Adresse}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Adresse"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={fournisseur.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900">
                Téléphone
              </label>
              <input
                type="text"
                id="telephone"
                value={fournisseur.telephone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Téléphone"
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="bg-[#070c2b] hover:bg-[#070c2bc8] text-white w-[160px] px-4 py-2 rounded-lg mt-4 absolute bottom-5 right-12"
          >
            Ajouter Fournisseur
          </button>
        </form>
      </div>
    </>
  );
};

export default AjouterFour;