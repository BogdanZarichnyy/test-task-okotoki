import Button from '../button/Button';
import { IInputSearchCoins } from '../../assets/interfaces';

import css from './InputSearchCoins.module.css';

import sprite from '../../assets/sprite.svg';

const InputSearchCoins = ({ handlerChangeInput, seacrhText, isInputSeacrhClear, handlerButtonClearSearchCoins }: IInputSearchCoins) => {
  return (
    <div className={css.inputSearch}>

      <svg className={css.searchIcon} width="20px" height="20px">
        <use id="search" href={`${sprite}#search`} />
      </svg>

      <input className={css.inputSearchCoins} 
        type="text" 
        onChange={handlerChangeInput} 
        value={seacrhText} 
        placeholder='Search...'
      />

      {!isInputSeacrhClear &&
        <Button 
          styles={css.buttonClearSearchCoins}
          onClick={handlerButtonClearSearchCoins}
        >
          <svg className={css.crossIcon} width="11px" height="11px">
            <use id="close" href={`${sprite}#close`} />
          </svg>
        </Button>
      }

    </div>
  );
}

export default InputSearchCoins;