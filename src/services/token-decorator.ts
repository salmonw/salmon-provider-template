import { IBalanceItem } from './balance';
import { ICoin } from './coin';
import { IToken } from './token';

const decorateBalanceList = (
  items: IBalanceItem[],
  tokens: IToken[],
): IBalanceItem[] => {
  const result = items.map((item) => {
    const token = tokens.find((t) => t.address === item.mint);
    return { ...item, ...token };
  });
  return result;
};

const getLast24HoursChange = (price: ICoin, usdBalance) => {
  if (price.perc24HoursChange === undefined || price.perc24HoursChange === null) {
    return null;
  }

  const perc = price.perc24HoursChange;
  const prevBalance = (1 - perc / 100) * usdBalance;
  const usd = usdBalance - prevBalance;
  return {
    perc,
    usd,
  };
};

const decorateBalancePrices = (items: IBalanceItem[], prices: ICoin[]) => {
  const result = items.map((item) => {
    const price = item.symbol
      ? prices.find((t: ICoin) => t.symbol.toUpperCase() === item.symbol.toUpperCase())
      : null;
    const usdBalance = price.usdPrice ? item.uiAmount * price.usdPrice : null;
    const last24HoursChange = getLast24HoursChange(price, usdBalance);
    return {
      ...item,
      usdPrice: price.usdPrice,
      usdBalance,
      last24HoursChange,
    };
  });
  return result;
};

export {
  decorateBalanceList,
  decorateBalancePrices,
};
