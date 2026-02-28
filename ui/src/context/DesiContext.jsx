import { createContext, useState } from "react";

export const DesiContext = createContext();

const DesiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pdtsToDisplay, setPdtsToDisplay] = useState([]);
  const [user, setUser] = useState("");
  const [logFlag, setLogFlag] = useState(false);

  return (
    <DesiContext.Provider
      value={{
        products,
        setProducts,
        pdtsToDisplay,
        setPdtsToDisplay,
        user,
        setUser,
        logFlag,
        setLogFlag,
      }}
    >
      {children}
    </DesiContext.Provider>
  );
};

export default DesiProvider;
