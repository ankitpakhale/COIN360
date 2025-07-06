import { useState, useEffect, useRef } from "react";
import { CryptoApiResponse, CryptoData } from "@/types/crypto";

const API_PROXY_URL = "http://localhost:3000/api/proxy";

const UPDATE_INTERVAL = 1500; // 1.5 seconds

// Toggle this to enable/disable test mode
const IS_TEST_MODE = false;

// Simulate real-time fluctuations in test mode
const simulateRealtimeFluctuations = (
  data: CryptoApiResponse
): CryptoApiResponse => {
  return {
    result: data.result.map((ticker) => {
      const priceFluctuation = ticker.price * (Math.random() * 0.01 - 0.005); // ±0.5%
      const volumeFluctuation = ticker.volume * (Math.random() * 0.05 - 0.025); // ±2.5%

      return {
        ...ticker,
        price: Number((ticker.price + priceFluctuation).toFixed(6)),
        volume: Math.max(0, Math.round(ticker.volume + volumeFluctuation)),
      };
    }),
  };
};

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousDataRef = useRef<Map<string, number>>(new Map());
  const priceHistoryRef = useRef<
    Map<string, { live: number[]; hour: number[]; day: number[] }>
  >(new Map());

  const fetchData = async () => {
    try {
      const response = await fetch(API_PROXY_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let apiData: CryptoApiResponse = null;
      // Inject fluctuations if in test mode
      if (IS_TEST_MODE) {
        apiData = {
          result: [
            {
              symbol: "aave",
              name: "Aave",
              slug: "aave",
              price: 277.348176,
              volume: 125718,
              supply: 15079417,
            },
            {
              symbol: "xtz",
              name: "Tezos",
              slug: "tezos",
              price: 0.524613,
              volume: 90463,
              supply: 1031496344,
            },
            {
              symbol: "eth",
              name: "Ethereum",
              slug: "ethereum",
              price: 2551.273274,
              volume: 433272,
              supply: 120568910,
            },
            {
              symbol: "xrp",
              name: "XRP",
              slug: "ripple",
              price: 2.268317,
              volume: 130262901,
              supply: 57887806032,
            },
            {
              symbol: "bnb",
              name: "BNB",
              slug: "bnb",
              price: 659.949786,
              volume: 56724,
              supply: 142476616,
            },
            {
              symbol: "btc",
              name: "Bitcoin",
              slug: "bitcoin",
              price: 108752.112414,
              volume: 14773,
              supply: 19888475,
            },
            {
              symbol: "sol",
              name: "Solana",
              slug: "solana",
              price: 150.892001,
              volume: 2204167,
              supply: 488731835,
            },
            {
              symbol: "trump",
              name: "TRUMP",
              slug: "trump",
              price: 8.550719,
              volume: 1585122,
              supply: 199999578,
            },
            {
              symbol: "ltc",
              name: "Litecoin",
              slug: "litecoin",
              price: 87.667225,
              volume: 501031,
              supply: 75558468,
            },
            {
              symbol: "ada",
              name: "Cardano",
              slug: "cardano",
              price: 0.581927,
              volume: 101286257,
              supply: 35204786637,
            },
            {
              symbol: "wif",
              name: "dogwifhat",
              slug: "dogwifhat",
              price: 0.884158,
              volume: 89941318,
              supply: 998841288,
            },
            {
              symbol: "uni",
              name: "Uniswap",
              slug: "uniswap",
              price: 7.400196,
              volume: 7209341,
              supply: 600518037,
            },
            {
              symbol: "bch",
              name: "BCash",
              slug: "bcash",
              price: 491.543546,
              volume: 1353,
              supply: 19833122,
            },
            {
              symbol: "atom",
              name: "Cosmos",
              slug: "cosmos",
              price: 4.041948,
              volume: 3258843,
              supply: 390934204,
            },
            {
              symbol: "link",
              name: "Chainlink",
              slug: "chainlink",
              price: 13.353888,
              volume: 2606705,
              supply: 638099970,
            },
            {
              symbol: "dot",
              name: "Polkadot",
              slug: "polkadot",
              price: 3.381191,
              volume: 7741496,
              supply: 1551435797,
            },
            {
              symbol: "zec",
              name: "Zcash",
              slug: "zcash",
              price: 38.65635,
              volume: 2326,
              supply: 15886821,
            },
            {
              symbol: "dash",
              name: "Dash",
              slug: "dash",
              price: 20.100487,
              volume: 844,
              supply: 12160624,
            },
            {
              symbol: "xlm",
              name: "Stellar",
              slug: "stellar",
              price: 0.242366,
              volume: 4726000,
              supply: 30654072282,
            },
            {
              symbol: "comp",
              name: "Compound",
              slug: "compound",
              price: 41.17928,
              volume: 66264,
              supply: 8869891,
            },
            {
              symbol: "etc",
              name: "Eth Classic",
              slug: "eth-classic",
              price: 16.583242,
              volume: 7549,
              supply: 150862061,
            },
            {
              symbol: "matic",
              name: "Polygon",
              slug: "polygon",
              price: 0.183412,
              volume: 2169631,
              supply: 8586040627,
            },
            {
              symbol: "fil",
              name: "Filecoin",
              slug: "filecoin",
              price: 2.270572,
              volume: 51001,
              supply: 637758346,
            },
            {
              symbol: "xmr",
              name: "Monero",
              slug: "monero",
              price: 315.128816,
              volume: 2647,
              supply: 18446744,
            },
            {
              symbol: "doge",
              name: "Dogecoin",
              slug: "dogecoin",
              price: 0.169322,
              volume: 709774213,
              supply: 148161796383,
            },
            {
              symbol: "avax",
              name: "Avalanche",
              slug: "avalanche",
              price: 18.079496,
              volume: 1366486,
              supply: 413965821,
            },
            {
              symbol: "sui",
              name: "Sui",
              slug: "sui",
              price: 2.91587,
              volume: 37803791,
              supply: 3089707194,
            },
            {
              symbol: "eos",
              name: "EOS",
              slug: "eos",
              price: 0.482581,
              volume: 60504,
              supply: 1548342071,
            },
            {
              symbol: "mana",
              name: "Decentraland",
              slug: "decentraland",
              price: 0.264188,
              volume: 857706,
              supply: 1942255184,
            },
            {
              symbol: "trx",
              name: "TRON",
              slug: "tron",
              price: 0.284617,
              volume: 1954861,
              supply: 86083900265,
            },
          ],
        };
        apiData = simulateRealtimeFluctuations(apiData);
      } else {
        apiData = await response.json();
      }

      const processedData: CryptoData[] = apiData.result.map((ticker) => {
        const previousPrice =
          previousDataRef.current.get(ticker.symbol) || ticker.price;
        const priceChange = ticker.price - previousPrice;
        const changeDirection =
          priceChange > 0 ? "up" : priceChange < 0 ? "down" : "neutral";

        // Update price history for mini charts
        const currentHistory = priceHistoryRef.current.get(ticker.symbol) || {
          live: [],
          hour: [],
          day: [],
        };
        const newLiveHistory = [...currentHistory.live, ticker.price].slice(
          -20
        );
        const newHourHistory = [
          ...currentHistory.hour,
          ticker.price + (Math.random() - 0.5) * ticker.price * 0.02,
        ].slice(-12);
        const newDayHistory = [
          ...currentHistory.day,
          ticker.price + (Math.random() - 0.5) * ticker.price * 0.05,
        ].slice(-24);

        priceHistoryRef.current.set(ticker.symbol, {
          live: newLiveHistory,
          hour: newHourHistory,
          day: newDayHistory,
        });

        // Update previous price
        previousDataRef.current.set(ticker.symbol, ticker.price);

        return {
          ...ticker,
          marketCap: ticker.price * ticker.supply,
          priceChange,
          changeDirection,
          priceHistory: {
            live: newLiveHistory,
            hour: newHourHistory,
            day: newDayHistory,
          },
        };
      });

      setData(processedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchData };
};
