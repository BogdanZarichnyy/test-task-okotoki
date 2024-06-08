import Button from '../button/Button';
import { IFilterCoins } from '../../assets/interfaces';

import css from './FilterCoins.module.css';

import sprite from '../../assets/sprite.svg';

const FilterCoins = ({ isFavoriteCoins, handlerButtonFilter }: IFilterCoins) => {
  return (
    <div className={css.filterCoins}>

      <Button
        styles={[
          css.buttonFilter, 
          isFavoriteCoins && css.activeButtonFilter
        ].join(' ')} 
        onClick={() => handlerButtonFilter(true)} 
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
        onClick={() => handlerButtonFilter(false)} 
        text='All coins' 
      />

    </div>
  );
}

export default FilterCoins;