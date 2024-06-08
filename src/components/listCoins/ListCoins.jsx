import css from './ListCoins.module.css';

import sprite from '../../images/sprite.svg';

const ListCoins = ({ coins, isFavoriteCoins, seacrhText, handlerFavoriteCoin }) => {
  return (
    <ul className={css.listCoins} id="scroll">
      {!!coins && coins
        .filter((item) => !isFavoriteCoins ? item : item.isFavorite)
        .filter((item) => item.coin.includes(seacrhText.toUpperCase()) )
        .map((item) =>
        <li className={css.itemCoins} key={item.id}>
          <svg className={[css.favoriteCoinIcon, !item.isFavorite && css.primaryCoinIcon].join(' ')} 
            width="14px" 
            height="12px" 
            onClick={() => handlerFavoriteCoin(item)}
          >
            <use id="star" href={`${sprite}#star`} />
          </svg>
          {item.coin}
        </li>
      )}
    </ul>
  );
}

export default ListCoins;