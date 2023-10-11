// Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Horoscope from '../components/horoscope';
import ParentComponent from '../components/parentComponant';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [horoscopeData, setHoroscopeData] = useState([]); // Définissez horoscopeData comme un état

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = newIndex <= 1 ? horoscopeData.length : newIndex - 1;
    } else if (direction === 'right') {
      newIndex = newIndex >= horoscopeData.length ? 1 : newIndex + 1;
    }

    setCurrentIndex(newIndex);
  };

  // Exécutez une action pour récupérer les données d'horoscope au chargement du composant
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
  }, []); // Utilisez une dépendance vide pour exécuter cet effet une seule fois au chargement du composant

  return (
    <>
      <Header
        currentIndex={currentIndex}
        onIndexChange={handleIndexChange}
        onArrowClick={handleArrowClick}
        horoscopeData={horoscopeData} // Passez horoscopeData comme prop
      />
      <Horoscope />
      <ParentComponent />
    </>
  );
}

export default Home;
