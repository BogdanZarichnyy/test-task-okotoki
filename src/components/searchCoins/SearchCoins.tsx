import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import InputSearchCoins from '../inputSearchCoins/InputSearchCoins';
import FilterCoins from '../filterCoins/FilterCoins';
import ListCoins from '../listCoins/ListCoins';

import { ISearchCoins } from '../../assets/interfaces';
import { CoinDataType } from '../../assets/types';

import css from './SearchCoins.module.css';

import coinsJSON from '../../assets/coins.json';

const SearchCoins = ({ setIsOpenSeacrhList }: ISearchCoins) => {
  const [coins, setCoins] = useState<CoinDataType[] | null>(null);
  const [seacrhText, setSeacrhText] = useState<string>('');
  const [isInputSeacrhClear, setIsInputSeacrhClear] = useState<boolean>(true);
  const [isFavoriteCoins, setIsFavoriteCoins] = useState<boolean>(false);

  useEffect(() => {
    setCoins(
      [...coinsJSON
        .filter((item) => item !== '')
        .map((item, index) => ({ id: index, coin: item, isFavorite: false }) )
      ].sort((prevItem, item) => prevItem.coin.localeCompare(item.coin))
    );
  }, []);

  const handlerCloseSearchList = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setIsOpenSeacrhList(false);
      setIsFavoriteCoins(false);
    }
  }

  const handlerButtonClearSearchCoins = () => {
    setSeacrhText('');
    setIsInputSeacrhClear(true);
  }

  const handlerChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSeacrhText(searchText);
    if (searchText === '') {
      setIsInputSeacrhClear(true);
    } else setIsInputSeacrhClear(false);
  }

  const handlerFavoriteCoin = (coinInfo: CoinDataType) => {
    setCoins((prevState: CoinDataType[] | null) => {
      if (prevState === null) {
        return null;
      } else return ([
        ...prevState
          .filter((item) => item.id !== coinInfo.id),
          { id: coinInfo.id, coin: coinInfo.coin, isFavorite: !coinInfo.isFavorite }
        ].sort((prevItem, item) => prevItem.coin.localeCompare(item.coin))
      );
    });
  }

  const handlerButtonFilter = (isFavorite: boolean) => {
    setIsFavoriteCoins(isFavorite);
  }

  return ReactDOM.createPortal(
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
    </div>,
    document.body
  );
}

export default SearchCoins;