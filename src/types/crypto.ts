export interface CryptoTicker {
  symbol: string;
  name: string;
  slug: string;
  price: number;
  volume: number;
  supply: number;
}

export interface CryptoApiResponse {
  result: CryptoTicker[];
}

export interface CryptoData extends CryptoTicker {
  marketCap: number;
  priceChange: number;
  changeDirection: 'up' | 'down' | 'neutral';
  priceHistory: {
    live: number[];
    hour: number[];
    day: number[];
  };
}

export interface PriceChangeData {
  live: number[];
  hour: number[];
  day: number[];
}