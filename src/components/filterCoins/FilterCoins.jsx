import Button from '../button/Button';

import css from './FilterCoins.module.css';

import sprite from '../../images/sprite.svg';

const FilterCoins = ({ isFavoriteCoins, handlerButtonFilter }) => {
  return (
    <div className={css.filterCoins}>

      <Button
        styles={[
          css.buttonFilter, 
          isFavoriteCoins && css.activeButtonFilter
        ].join(' ')} 
        onClick={handlerButtonFilter} 
        text='Favorites' 
      >
        <svg className={css.favoriteCoinIcon} width="14px" height="12px">
          <use id="star" href={`${sprite}#star`} />
        </svg>
      </Button>

      <Button
        styles={[
          css.buttonFilter, 
          !isFavoriteCoins && css.activeButtonFilter
        ].join(' ')} 
        onClick={handlerButtonFilter} 
        text='All coins' 
      />

    </div>
  );
}

export default FilterCoins;