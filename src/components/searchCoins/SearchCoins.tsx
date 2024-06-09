import { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import InputSearchCoins from '../inputSearchCoins/InputSearchCoins';
import FilterCoins from '../filterCoins/FilterCoins';
import ListCoins from '../listCoins/ListCoins';

import { ISearchCoins } from '../../assets/interfaces';
import { CoinDataType } from '../../assets/types';

import css from './SearchCoins.module.css';

import coinsJSON from '../../assets/coins.json';

const SearchCoins = ({ setIsOpenSeacrhList }: ISearchCoins) => {
  const [coinsList, setCoinsList] = useState<CoinDataType[] | null>(null);
  const [totalCountCoins, setTotalCountCoins] = useState<number>(0);
  const [seacrhText, setSeacrhText] = useState<string>('');
  const [isInputSeacrhClear, setIsInputSeacrhClear] = useState<boolean>(true);
  const [isFavoriteCoins, setIsFavoriteCoins] = useState<boolean>(false);

  useEffect(() => {
    setCoinsList(
      [...coinsJSON
        .filter((item) => item !== '')  // один із записів JSON пустий
        .map((item, index) => ({ id: index, coin: item, isFavorite: false }) )
      ].sort((prevItem, item) => prevItem.coin.localeCompare(item.coin))
    );
    setTotalCountCoins(() => coinsJSON.length - 1); // один із записів JSON пустий
  }, []);

  const filterListCoin = useMemo(() => {
    const filterList = coinsList !== null 
      ? coinsList
        .filter((item) => !isFavoriteCoins ? item : item.isFavorite)
        .filter((item) => item.coin.includes(seacrhText.toUpperCase()))
      : [];

    setTotalCountCoins(filterList.length);

    return filterList;
  }, [coinsList, isFavoriteCoins, seacrhText]);

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
    setCoinsList((prevState: CoinDataType[] | null) => {
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
          filterListCoin={filterListCoin}
          totalCountCoins={totalCountCoins}
          handlerFavoriteCoin={handlerFavoriteCoin}
        />

      </div>
    </div>,
    document.body
  );
}

export default SearchCoins;