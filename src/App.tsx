import { useState } from 'react';
import Button from './components/button/Button';
import SearchCoins from './components/searchCoins/SearchCoins';

import css from './App.module.css';

import sprite from './assets/sprite.svg';

const App = () => {
  const [isOpenSeacrhList, setIsOpenSeacrhList] = useState<boolean>(false);

  const handlerButtonToggleSearchList = () => {
    setIsOpenSeacrhList(!isOpenSeacrhList);
  }

  return (
    <div className={css.App}>
      <div className={css.container}>
        <div className={css.wrraper}>

          <div className={css.header}>

            <p className={css.info}>
              <span className={css.infoItem}>BTC</span>
              <span className={css.infoItem}>ETH</span>
              <span className={css.infoItem}>XTZ</span>
            </p>

            <Button 
              onClick={handlerButtonToggleSearchList}
              text='Search'
            >
              <svg className={css.searchIcon} width="20px" height="20px">
                <use id="search" href={`${sprite}#search`} />
              </svg>
            </Button>

            {isOpenSeacrhList &&
              <SearchCoins setIsOpenSeacrhList={setIsOpenSeacrhList} />
            }

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
