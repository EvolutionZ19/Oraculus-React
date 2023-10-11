import React, { useState, useEffect } from 'react';
import Header from './header';

function ParentComponent() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [horoscopeData, setHoroscopeData] = useState([]);

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    async function fetchHoroscopeData() {
      try {
        const response = await fetch('/data/horoscope.json'); 
        if (!response.ok) {
          throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        setHoroscopeData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'horoscope :', error);
      }
    }

    fetchHoroscopeData();
  }, []);

  return (
    <div>
      <Header
        currentIndex={currentIndex}
        onIndexChange={handleIndexChange}
        horoscopeData={horoscopeData} // Passez les données d'horoscope ici
      />
    </div>
  );
}

export default ParentComponent;
