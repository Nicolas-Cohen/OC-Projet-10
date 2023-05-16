import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // On utilise le contexte "Data" pour récupérer les événements à afficher
  const { data } = useData();
  // On utilise l'état local "index" pour savoir quelle carte afficher
  const [index, setIndex] = useState(0);

  // On trie les événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  // On définit une fonction pour afficher la carte suivante
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) {
      setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
    };
  };

  // On utilise l'effet d'effet pour appeler la fonction nextCard toutes les 5 secondes
  useEffect(() => {
    nextCard();
  });

  // On retourne le composant "Slider" qui contient une liste de cartes et une pagination
  return (
    <div className="SlideCardList">
    {byDateDesc?.map((event, idx) => (
      <React.Fragment key={`${idx+1}`}>
        <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => (
              <input
                key={`${radioIdx+1}`}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    ))}
  </div>
);
};

export default Slider;
