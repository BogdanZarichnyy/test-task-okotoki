import { CoinDataType } from "./types"

export interface IButton {
  styles?: string,
  children?: React.ReactNode,
  onClick: () => void,
  text?: string,
}

export interface ISearchCoins {
  setIsOpenSeacrhList: React.Dispatch<React.SetStateAction<boolean>>, 
}

export interface IInputSearchCoins {
  handlerChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  seacrhText: string,
  isInputSeacrhClear: boolean,
  handlerButtonClearSearchCoins: () => void,
}

export interface IFilterCoins {
  isFavoriteCoins: boolean, 
  handlerButtonFilter: (isFavorite: boolean) => void
}

export interface IListCoins {
  coins: CoinDataType[] | null, 
  isFavoriteCoins: boolean,
  seacrhText: string,
  handlerFavoriteCoin: (coinInfo: CoinDataType) => void
}