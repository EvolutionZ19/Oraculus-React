import React, { useState, useEffect } from 'react';
import logo from '../assets/capricorne.png';
import { Link } from 'react-router-dom';

function Horoscope() {
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  async function getDatas() {
    const response = await fetch('/data/horoscope.json');
    if (!response.ok) {
      throw new Error('Échec de la récupération des données');
    }
    return response.json();
  }

  const showDatas = (datas, id) => {
    const signeActuel = datas.find(el => el.id === id);

    if (!signeActuel) {
      return;
    }

    document.querySelector('h1').innerText = signeActuel.signe || 'Signe non trouvé';
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
  };

  const changeTop = (datas, id) => {
    const signeActuel = datas.find(el => el.id === id);

    if (!signeActuel) {
      return;
    }

    const top = document.querySelector('aside img');
    top.style.top = signeActuel.top;
  };

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : horoscopeData.length - 1);
    }
    if (direction === 'right') {
      setCurrentIndex(currentIndex < horoscopeData.length - 1 ? currentIndex + 1 : 0);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const datas = await getDatas();
        setHoroscopeData(datas);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation :', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (horoscopeData.length === 0) {
      return;
    }
    showDatas(horoscopeData, currentIndex);
    changeTop(horoscopeData, currentIndex);
  }, [currentIndex, horoscopeData]);

  return (
    <main>
      <section>
        <div>
          {/* Flèche gauche */}
          <Link className="left-horoscope" to="#" onClick={() => handleArrowClick('left')}>
            {horoscopeData[currentIndex - 1] ? horoscopeData[currentIndex - 1].signe : 'Signe précédent'}
          </Link>

          {/* Flèche droite */}
          <Link className="right-horoscope" to="#" onClick={() => handleArrowClick('right')}>
            {horoscopeData[currentIndex + 1] ? horoscopeData[currentIndex + 1].signe : 'Signe suivant'}
          </Link>
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
