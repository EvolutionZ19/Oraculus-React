import React, { useState, useEffect } from 'react';
import logo from '../assets/capricorne.png';


function Horoscope() {
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  async function init() {
    try {
      const datas = await getDatas();
      setHoroscopeData(datas);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation :', error);
    }
  }

  async function getDatas() {
    const response = await fetch('/data/horoscope.json');
    if (!response.ok) {
      throw new Error('Échec de la récupération des données');
    }
    return response.json();
  }

  const showDatas = (datas, id) => {
    const signeActuel = datas.find(el => el.id === id);
  
    if (signeActuel) {
      document.querySelector('h1').innerText = signeActuel.signe;
      document.querySelector('#date').innerText = `DU ${signeActuel.date}`;
      document.querySelector('#amour').innerHTML = `<span>Amour :</span> ${signeActuel.amour}`;
      document.querySelector('#travail').innerHTML = `<span>Travail :</span> ${signeActuel.travail}`;
      document.querySelector('#argent').innerHTML = `<span>Argent :</span> ${signeActuel.argent}`;
      document.querySelector('#sante').innerHTML = `<span>Santé :</span> ${signeActuel.sante}`;
      document.querySelector('#famille').innerHTML = `<span>Famille et amis :</span> ${signeActuel.famille}`;
      document.querySelector('#conseil').innerHTML = `<span>Conseil :</span> ${signeActuel.conseil}`;
  
      // Mettez à jour l'image en fonction du signe actuel
      const imageElement = document.querySelector('aside img');
      imageElement.src = signeActuel.image;
      imageElement.alt = signeActuel.signe;
    }
  };
  

  function changeTop(datas, id) {
    // Calculer l'ID du signe précédent et suivant
    const prev = id <= 1 ? datas.length : id - 1;
    const next = id >= datas.length ? 1 : id + 1;

    // Rechercher les signes précédent et suivant dans le tableau
    const signePrecedent = datas.find(el => el.id === prev);
    const signeSuivant = datas.find(el => el.id === next);

    // Mettez à jour l'état React pour refléter les changements
    // Utilisez setState ou l'utilisation de hooks pour mettre à jour l'interface utilisateur
    if (signePrecedent && signeSuivant) {
      // Mettez à jour l'état ici
    }
  }

  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = newIndex <= 1 ? horoscopeData.length : newIndex - 1;
    } else if (direction === 'right') {
      newIndex = newIndex >= horoscopeData.length ? 1 : newIndex + 1;
    }

    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (horoscopeData.length > 0) {
      showDatas(horoscopeData, currentIndex);
      changeTop(horoscopeData, currentIndex);
    }
  }, [currentIndex, horoscopeData]);

  return (
    <main>
      <section>
        <div>
          {/* Flèche gauche */}
          <a className="left-horoscope" href="#" onClick={() => handleArrowClick('left')}>Sagittaire <span>22 NOV AU 21 DEC</span></a>
          
          {/* Flèche droite */}
          <a className="right-horoscope" href="#" onClick={() => handleArrowClick('right')}>Cancer <span>22 NOV AU 21 DEC</span></a>
        </div>
        <article>
          <p id="datejour">-- HOROSCOPE DU 28/09/2023</p>
          <h1></h1>
          <span id="date"></span>
          <div>
            <p id="amour"><span>Amour :</span></p>
            <p id="travail"><span>Travail :</span></p>
            <p id="argent"><span>Argent :</span></p>
            <p id="sante"><span>Santé :</span></p>
            <p id="famille"><span>Famille et amis :</span></p>
            <p id="conseil"><span>Conseil :</span></p>
          </div>
        </article>
      </section>
      <aside>
        <img src={logo} alt="Capricorne" />
      </aside>
    </main>
  );
}

export default Horoscope;
