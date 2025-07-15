import { createContext, useState, useEffect } from "react";

export const ScholarContext = createContext();
export const ScholarContextProvider = ({ children }) => {
  const [scholarDetails, setScholarDetails] = useState({});
  useEffect(() => {
    const storedScholar = localStorage.getItem("scholarDetails");
    if (storedScholar) {
      setScholarDetails(JSON.parse(storedScholar));
    }
  }, []);

  useEffect(() => {
    if (scholarDetails && Object.keys(scholarDetails).length > 0) {
      localStorage.setItem("scholarDetails", JSON.stringify(scholarDetails));
    } else {
      localStorage.removeItem("scholarDetails");
    }
  }, [scholarDetails]);
  return (
    <ScholarContext.Provider value={{ scholarDetails, setScholarDetails }}>
      {children}
    </ScholarContext.Provider>
  );
};
