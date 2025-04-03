import { useState } from "react";

const Drawer = ({ setPage }) => {
  const [activePage, setActivePage] = useState(0);

  const handleSetPage = (page) => {
    setPage(page);
    setActivePage(page);
  };

  const AddInvoiceIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zM6 18v-2h8v2H6zm12-5H6V6h12v7z" />
    </svg>
  );

  const InvoiceListIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 4h8v2H8V9zm0 4h8v2H8v-2z" />
    </svg>
  );

  const AddProductIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
      />
    </svg>
  );
  

  const AddCategoryIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </svg>
  );
  
  const AddChiffreicon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
      />
      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
    </svg>
  );
  


  const ProductListIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2z" />
    </svg>
  );

  const CategoryListIcon = ({ isActive }) => (
    <svg
      className={`w-6 h-6 transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
  );

  const ProformaInvoiceIcon = ({ isActive }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill={isActive ? "white" : "gray"}
      className="bi bi-file-earmark-pdf-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
      <path
        fillRule="evenodd"
        d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
      />
    </svg>
  );

  return (
    
    <div
      style={{
        height: "calc(100vh - 80px)",
      }}
      id="drawer-navigation"
      className="z-40 h-screen border-[#cfc9c9] border-r-[1px] p-4 overflow-y-auto w-[300px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
    >
      
<div class="flex items-center gap-4 border-b-2 border-gray pb-[20px] mb-[20px]">
    <img class="w-12 h-12 rounded-full" src="../../../public/photo 600 px  .600 px.jpg" alt="" />
    <div class="font-medium dark:text-white">
        <div>LONGAR Rafik</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Vendeur</div>
    </div>
</div>


      <ul className="space-y-3">
        {/* Liste Catégories */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 0
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(0)}
        >
          <CategoryListIcon isActive={activePage === 0} />
          <span className="ml-3">Liste Catégories</span>
        </li>

        {/* Ajouter Catégorie */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 1
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(1)}
        >
          <AddCategoryIcon isActive={activePage === 1} />
          <span className="ml-3">Ajouter Catégorie</span>
        </li>

        {/* Liste Produit */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 2
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(2)}
        >
          <ProductListIcon isActive={activePage === 2} />
          <span className="ml-3">Liste Produit</span>
        </li>

        {/* Ajouter Produit */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 3
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(3)}
        >
          <AddProductIcon isActive={activePage === 3} />
          <span className="ml-3">Ajouter Produit</span>
        </li>

        {/* Ajouter Facture */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 4
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(4)}
        >
          <AddInvoiceIcon isActive={activePage === 4} />
          <span className="ml-3">Caisse</span>
        </li>

        {/* Liste Facture */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 5
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(5)}
        >
          <InvoiceListIcon isActive={activePage === 5} />
          <span className="ml-3">Liste D'acchat</span>
        </li>
        <li
          className={`flex  p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 6
              ? "bg-[#070c2b] text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(6)}
        >
          <AddChiffreicon isActive={activePage === 6}  />
          <span className="ml-3 ">Chiffre d'affaire</span>
        </li>
      
      </ul>
    </div>
  );
};

export default Drawer;