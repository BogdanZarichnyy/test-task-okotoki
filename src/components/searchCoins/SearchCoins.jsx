import { useEffect, useState } from 'react';
import InputSearchCoins from '../inputSearchCoins/InputSearchCoins';
import FilterCoins from '../filterCoins/FilterCoins';
import ListCoins from '../listCoins/ListCoins';

import css from './SearchCoins.module.css';

import coinsJSON from '../../assets/coins.json';

const SearchCoins = ({ setIsOpenSeacrhList }) => {
  const [coins, setCoins] = useState(null);
  const [seacrhText, setSeacrhText] = useState('');
  const [isInputSeacrhClear, setIsInputSeacrhClear] = useState(true);
  const [isFavoriteCoins, setIsFavoriteCoins] = useState(false);

  useEffect(() => {
    setCoins(
      [...coinsJSON
        .filter((item) => item !== '')
        .map((item, index) => ({ id: index, coin: item, isFavorite: false }) )
      ].sort((prevItem, item) => prevItem.coin.localeCompare(item.coin))
    );
  }, []);

  const handlerCloseSearchList = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpenSeacrhList(false);
      setIsFavoriteCoins(false);
    }
  }

  const handlerButtonClearSearchCoins = () => {
    setSeacrhText('');
    setIsInputSeacrhClear(true);
  }

  const handlerChangeInput = (event) => {
    const searchText = event.target.value;
    setSeacrhText(searchText);
    if (searchText === '') {
      setIsInputSeacrhClear(true);
    } else setIsInputSeacrhClear(false);
  }

  const handlerFavoriteCoin = (coinInfo) => {
    setCoins((prevState) =>
      [...prevState
        .filter((item) => item.id !== coinInfo.id),
        { id: coinInfo.id, coin: coinInfo.coin, isFavorite: !coinInfo.isFavorite }
      ].sort((prevItem, item) => prevItem.coin.localeCompare(item.coin))
    );
  }

  const handlerButtonFilter = () => {
    setIsFavoriteCoins(!isFavoriteCoins);
  }

  return (
    <div className={css.backdropSearchCoins} onClick={handlerCloseSearchList}>
      <div className={css.searchCoins} >

        <InputSearchCoins 
          handlerChangeInput={handlerChangeInput}
          seacrhText={seacrhText}
          isInputSeacrhClear={isInputSeacrhClear}
          handlerButtonClearSearchCoins={handlerButtonClearSearchCoins}
        />

        <FilterCoins 
          isFavoriteCoins={isFavoriteCoins}
          handlerButtonFilter={handlerButtonFilter}
        />

        <ListCoins 
          coins={coins}
          isFavoriteCoins={isFavoriteCoins}
          seacrhText={seacrhText}
          handlerFavoriteCoin={handlerFavoriteCoin}
        />

      </div>
    </div>
  );
}

export default SearchCoins;