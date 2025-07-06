import React, { useState, useMemo } from "react";
import { CryptoData } from "@/types/crypto";
import { MiniChart } from "./MiniChart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CryptoTableProps {
  data: CryptoData[];
  loading: boolean;
}

type SortKey =
  | "srno"
  | "marketCap"
  | "price"
  | "volume"
  | "supply"
  | "name"
  | "changeDirection";

export const CryptoTable = ({ data, loading }: CryptoTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatSupply = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
  };

  const getChangeColor = (direction: string) => {
    switch (direction) {
      case "up":
        return "text-bull";
      case "down":
        return "text-bear";
      default:
        return "text-neutral";
    }
  };

  const getChangeIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="h-4 w-4" />;
      case "down":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    return [...data]
      .map((crypto, index) => ({ ...crypto, srno: index + 1 }))
      .sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortKey) {
          case "srno":
            aValue = a.srno;
            bValue = b.srno;
            break;
          case "marketCap":
            aValue = a.marketCap;
            bValue = b.marketCap;
            break;
          case "price":
            aValue = a.price;
            bValue = b.price;
            break;
          case "volume":
            aValue = a.volume;
            bValue = b.volume;
            break;
          case "supply":
            aValue = a.supply;
            bValue = b.supply;
            break;
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "changeDirection":
            const order = { up: 2, neutral: 1, down: 0 };
            aValue = order[a.changeDirection] ?? 1;
            bValue = order[b.changeDirection] ?? 1;
            break;
          default:
            aValue = 0;
            bValue = 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, sortKey, sortDirection]);

  const SortArrow = ({ active }: { active: boolean }) => (
    <span className="inline-block ml-1">
      {active ? (sortDirection === "asc" ? "▲" : "▼") : ""}
    </span>
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center space-x-6">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-16" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              <th
                className="text-left p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("srno")}
              >
                Sr No
                <SortArrow active={sortKey === "srno"} />
              </th>
              <th
                className="text-left p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Coin
                <SortArrow active={sortKey === "name"} />
              </th>
              <th
                className="text-right p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("marketCap")}
              >
                Market Cap
                <SortArrow active={sortKey === "marketCap"} />
              </th>
              <th
                className="text-right p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("price")}
              >
                Price
                <SortArrow active={sortKey === "price"} />
              </th>
              <th
                className="text-right p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("volume")}
              >
                Volume (24h)
                <SortArrow active={sortKey === "volume"} />
              </th>
              <th
                className="text-right p-4 font-semibold text-sm cursor-pointer select-none"
                onClick={() => handleSort("supply")}
              >
                Supply
                <SortArrow active={sortKey === "supply"} />
              </th>
              <th className="text-center p-4 font-semibold text-sm">
                Live Change
              </th>
              <th className="text-center p-4 font-semibold text-sm">
                1H Change
              </th>
              <th className="text-center p-4 font-semibold text-sm">
                24H Change
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((crypto, index) => (
              <tr
                key={crypto.symbol}
                className="border-b border-border hover:bg-secondary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-4 font-mono text-sm">{crypto.srno}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center space-x-1 ${getChangeColor(
                        crypto.changeDirection
                      )}`}
                    >
                      {getChangeIcon(crypto.changeDirection)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {crypto.name}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-mono">
                  {formatNumber(crypto.marketCap)}
                </td>
                <td
                  className={`p-4 text-right font-mono font-semibold ${getChangeColor(
                    crypto.changeDirection
                  )}`}
                >
                  {formatNumber(crypto.price, 4)}
                </td>
                <td className="p-4 text-right font-mono">
                  {formatNumber(crypto.volume)}
                </td>
                <td className="p-4 text-right font-mono">
                  {formatSupply(crypto.supply)}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <MiniChart
                      data={crypto.priceHistory.live}
                      direction={crypto.changeDirection}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <MiniChart
                      data={crypto.priceHistory.hour}
                      direction={crypto.changeDirection}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <MiniChart
                      data={crypto.priceHistory.day}
                      direction={crypto.changeDirection}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
