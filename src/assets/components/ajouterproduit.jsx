import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AjouterProduit = () => {
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix_vente: "",
    prix_achat: "",
    quantite: "",
    reference: "",
    images: [],
    categorie_id: "",
    fournisseur_id: "", // Changed from fournisseur to fournisseur_id    // Changed from client to client_id
    etat: "local"
  });

  // Static options for etat select
  const etatOptions = [
    { value: "importation", label: "Importation" },
    { value: "local", label: "Local" }
  ];
  const [imagePreviews, setImagePreviews] = useState([]);

  //categories filter
  
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Fournisseurs state and handlers
  const [fournisseurs, setFournisseurs] = useState([]);
  const [filteredFournisseurs, setFilteredFournisseurs] = useState([]);
  const [fournisseurSearch, setFournisseurSearch] = useState("");
  const [isFournisseurDropdownOpen, setIsFournisseurDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://backendrafik.onrender.com/CategorieAll");
        if (response.ok) {
          const data = await response.json();
          // Sort categories alphabetically by name
          const sortedCategories = data.data.sort((a, b) => 
            a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
          );
          setCategories(sortedCategories);
          setFilteredCategories(sortedCategories);
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération des catégories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch fournisseurs
  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await fetch("https://backendrafik.onrender.com/fournisseurs");
        if (response.ok) {
          const data = await response.json();
          const sortedFournisseurs = data.data.sort((a, b) => 
            a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
          );
          setFournisseurs(sortedFournisseurs);
          setFilteredFournisseurs(sortedFournisseurs);
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération des fournisseurs.");
      }
    };
    fetchFournisseurs();
  }, []);
  

    // Filter categories based on search input
    useEffect(() => {
      if (categorySearch.trim() === "") {
        setFilteredCategories(categories);
      } else {
        const filtered = categories.filter(category =>
          category.nom.toLowerCase().includes(categorySearch.toLowerCase())
        );
        setFilteredCategories(filtered);
      }
    }, [categorySearch, categories]);
  
  // Filter fournisseurs
  useEffect(() => {
    if (fournisseurSearch.trim() === "") {
      setFilteredFournisseurs(fournisseurs);
    } else {
      const filtered = fournisseurs.filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(fournisseurSearch.toLowerCase())
      );
      setFilteredFournisseurs(filtered);
    }
  }, [fournisseurSearch, fournisseurs]);

    const handleCategorySelect = (categoryId, categoryName) => {
      setProduit(prev => ({
        ...prev,
        categorie_id: categoryId
      }));
      setCategorySearch(categoryName);
      setIsCategoryDropdownOpen(false);
    };

    const handleFournisseurSelect = (fournisseurId, fournisseurName) => {
      setProduit(prev => ({
        ...prev,
        fournisseur_id: fournisseurId
      }));
      setFournisseurSearch(fournisseurName);
      setIsFournisseurDropdownOpen(false);
    };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProduit((prevProduit) => ({
      ...prevProduit,
      [id]: value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...produit.images, ...files];
    const newPreviews = [...imagePreviews, ...files.map((file) => URL.createObjectURL(file))];

    setProduit((prevProduit) => ({
      ...prevProduit,
      images: newImages,
    }));
    setImagePreviews(newPreviews);
  };

  const handleRemoveImage = (index) => {
    const newImages = produit.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setProduit((prevProduit) => ({
      ...prevProduit,
      images: newImages,
    }));
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("nom", produit.nom.trim());
      formData.append("description", produit.description.trim());
      formData.append("prix_vente", produit.prix_vente);
      formData.append("prix_achat", produit.prix_achat);
      formData.append("quantite", produit.quantite);
      formData.append("reference", produit.reference.trim());
      formData.append("categorie_id", produit.categorie_id);
      formData.append("fournisseur", produit.fournisseur.trim()); // Add fournisseur
      formData.append("client", produit.client.trim());           // Add client
      formData.append("etat", produit.etat);                     // Add etat

      // Renommer et ajouter les images
      produit.images.forEach((image, index) => {
        const newName = `${produit.nom.replace(/\s+/g, '_')}_${index}_${Date.now()}_${image.name}`;
        const newImage = new File([image], newName, { type: image.type });
        formData.append("images", newImage);
      });

      const response = await fetch("https://backendrafik.onrender.com/ProduitSave", {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit");
      }

      setProduit({
        nom: "",
        description: "",
        prix_vente: "",
        prix_achat: "",
        quantite: "",
        reference: "",
        images: [],
        categorie_id: "",
        fournisseur_id: "", // Reset fournisseur
        etat: "local"   // Reset etat to default
      });
      setImagePreviews([]);
      toast.success("Produit ajouté avec succès !");
    } catch (error) {
      toast.error(error.message || "Erreur de connexion au serveur.");
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
              <a href="/ajouter-produit">Ajouter Produit</a>
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
                Nom de produit
              </label>
              <input
                type="text"
                id="nom"
                value={produit.nom}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nom du produit"
                required
              />
            </div>
  
            {/* Catégorie */}
            <div className="relative">
        <label htmlFor="categorySearch" className="block mb-2 text-sm font-medium text-gray-900">
          Catégorie
        </label>
        <div className="relative">
          <input
            type="text"
            id="categorySearch"
            value={categorySearch}
            onChange={(e) => {
              setCategorySearch(e.target.value);
              setIsCategoryDropdownOpen(true);
            }}
            onFocus={() => setIsCategoryDropdownOpen(true)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Rechercher une catégorie"
            required
          />
          <input
            type="hidden"
            id="categorie_id"
            value={produit.categorie_id}
          />
          {isCategoryDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(item.id, item.nom)}
                  >
                    {item.nom}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">Aucune catégorie trouvée</div>
              )}
            </div>
          )}
        </div>
      </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="description"
                value={produit.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Description du produit"
                required
              />
            </div>

            {/* Prix de vente */}
            <div>
              <label htmlFor="prix_vente" className="block mb-2 text-sm font-medium text-gray-900">
                Prix de vente
              </label>
              <input
                type="number"
                id="prix_vente"
                value={produit.prix_vente}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Prix de vente"
                required
              />
            </div>

            {/* Prix d'achat */}
            <div>
              <label htmlFor="prix_achat" className="block mb-2 text-sm font-medium text-gray-900">
                Prix d'achat
              </label>
              <input
                type="number"
                id="prix_achat"
                value={produit.prix_achat}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Prix d'achat"
                required
              />
            </div>

            {/* Quantité */}
            <div>
              <label htmlFor="quantite" className="block mb-2 text-sm font-medium text-gray-900">
                Quantité
              </label>
              <input
                type="number"
                id="quantite"
                value={produit.quantite}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Quantité"
                required
              />
            </div>

            {/* Référence */}
            <div>
              <label htmlFor="reference" className="block mb-2 text-sm font-medium text-gray-900">
                Référence
              </label>
              <input
                type="text"
                id="reference"
                value={produit.reference}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Référence du produit"
                required
              />
            </div>

            {/* Fournisseur */}
            <div className="relative">
              <label htmlFor="fournisseurSearch" className="block mb-2 text-sm font-medium text-gray-900">
                Fournisseur
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fournisseurSearch"
                  value={fournisseurSearch}
                  onChange={(e) => {
                    setFournisseurSearch(e.target.value);
                    setIsFournisseurDropdownOpen(true);
                  }}
                  onFocus={() => setIsFournisseurDropdownOpen(true)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Rechercher un fournisseur"
                />
                <input
                  type="hidden"
                  id="fournisseur_id"
                  value={produit.fournisseur_id}
                />
                {isFournisseurDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredFournisseurs.length > 0 ? (
                      filteredFournisseurs.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleFournisseurSelect(item.id, item.nom)}
                        >
                          {item.nom}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">Aucun fournisseur trouvé</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* État */}
            <div>
              <label htmlFor="etat" className="block mb-2 text-sm font-medium text-gray-900">
                État
              </label>
              <select
                id="etat"
                value={produit.etat}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {etatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img src={src} alt="Aperçu" className="w-20 h-20 object-cover rounded-lg shadow-md" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 w-5 h-5 text-white rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="bg-[#070c2b] hover:bg-[#070c2bc8] text-white w-[160px] px-4 py-2 rounded-lg mt-4 absolute bottom-5 right-12">
              Ajouter Produit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjouterProduit;