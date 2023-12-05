import React, { useState } from "react";
const useHomeStates = () => {
  const [isHomeScreenLoading, setIsHomeScreenLoading] = useState(false);
  return {
    isHomeScreenLoading,
    setIsHomeScreenLoading,
  };
};
export { useHomeStates };
export default useHomeStates;
