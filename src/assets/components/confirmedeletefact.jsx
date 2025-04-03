
import React from "react";

const ConfirmedeleteFact = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-labelledby="deleteDialogTitle" aria-describedby="deleteDialogDesc">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <h3 id="deleteDialogTitle" className="text-lg font-bold mb-4">Confirmer la suppression</h3>
        <p id="deleteDialogDesc" className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cette facture ? 
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedeleteFact;
