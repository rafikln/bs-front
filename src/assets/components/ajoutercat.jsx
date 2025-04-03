import { useState } from 'react';
import toast from 'react-hot-toast';

const AjouterCat = ({fetchData}) => {
  const [categorie, setCategorie] = useState({ nom: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategorie({ ...categorie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.trendybox-dz.com/CategorieSave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categorie),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Catégorie ajoutée avec succès !');
        setCategorie({ nom: '' })
        
      } else {
        const error = await response.json();
        toast.error(error.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      toast.error('Erreur de connexion à l’API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="w-full h-[90px] flex justify-between items-center p-[30px] ">
    <div className="breadcrumbs text-sm">
      <ul>
        <li className="text-[gray]">
          <a>Accueil</a>
        </li>
        <li className="text-[blue]">
          <a>Ajouter Catégorie</a>
        </li>
      </ul>
    </div>
    
  </div>

    <div className="w-full h-full px-[60px]" >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="nom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de catégorie
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={categorie.nom}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Entrez le nom de la catégorie"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-[#070c2b] hover:bg-[#070c2bc8] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? 'En cours...' : 'Enregistrer'}
        </button>
      </form>
    </div>
    </>
  );
};

export default AjouterCat;
