import { useState, useLayoutEffect, useRef, useMemo } from 'react';

import { IListCoins } from '../../assets/interfaces';
import { CoinDataType, VirtualItemType } from '../../assets/types';

import css from './ListCoins.module.css';

import sprite from '../../assets/sprite.svg';

const ListCoins = ({ filterListCoin, totalCountCoins, handlerFavoriteCoin }: IListCoins) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const containerHeight: number = 330; // px
  const itemHeightListCoin: number = 31; // px
  const itemMarginTopListCoin: number = 5; // px
  const itemHeight: number = itemHeightListCoin + itemMarginTopListCoin; // px
  const totalListHeight: number = itemHeight * totalCountCoins; // px
  const overscan: number = 3; // count items of coins for prerender

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) {
      return;
    }
    const handlerScroll = () => {
      const scrollTopElement = scrollElement.scrollTop;
      setScrollTop(scrollTopElement);
    }
    handlerScroll();
    scrollElement.addEventListener('scroll', handlerScroll);
    return () => scrollElement.removeEventListener('scroll', handlerScroll);
  }, []);

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(totalCountCoins - 1, endIndex + overscan);

    const virtualItems: VirtualItemType[] = [];

    for (let index = startIndex; index <= endIndex; index++ ) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight
      });
    }

    return virtualItems;
  }, [scrollTop, totalCountCoins, itemHeight]);

  return (
    <div className={css.listWrraper} style={{ height: containerHeight }} ref={scrollElementRef}>
      <ul className={css.listCoins} style={{ height: totalListHeight }} >
        {!!totalCountCoins && !!filterListCoin && virtualItems.map((virtualItem) => {
          const itemCoin: CoinDataType = filterListCoin[virtualItem.index];
          return (
            <li className={css.itemCoins} key={itemCoin.id} 
              style={{ transform: `translateY(${virtualItem.offsetTop - itemMarginTopListCoin}px)` }}
            >
              <svg className={[css.favoriteCoinIcon, !itemCoin.isFavorite && css.primaryCoinIcon].join(' ')} 
                width="14px" 
                height="12px" 
                onClick={() => handlerFavoriteCoin(itemCoin)}
              >
                <use id="star" href={`${sprite}#star`} />
              </svg>
              {itemCoin.coin}
            </li>
          )})
        }
      </ul>
    </div>
  );
}

export default ListCoins;