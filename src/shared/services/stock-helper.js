import { TradeTypeEnum } from "../constants/enums";

class StockHelper {
  static calculateStockWeight = (valueSum, value) => {
    const weight = value * 100 / valueSum;
    return Math.round(weight * 100) / 100;
  }

  static sumStockValues = (stocks, useChangedPrice = false) => stocks.reduce((acc, item) => {
    const price = useChangedPrice ? item.changedPrice : item.price;
    const value = item.units * price;
    return acc + value;
  }, 0);

  static getFullInfo = (stocks) => {
    const valuesSum = StockHelper.sumStockValues(stocks);
    const changedValuesSum = StockHelper.sumStockValues(stocks, true);

    return stocks.map(item => {
      const value = item.units * item.price;
      const changedValue = item.units * item.changedPrice;

      return {
        ...item,

        value,
        changedValue,

        weight: StockHelper.calculateStockWeight(valuesSum, value),
        changedWeight: StockHelper.calculateStockWeight(changedValuesSum, changedValue),
      };
    });
  }

  static adviseEqualizationTrades(stocks) {
    const reports = StockHelper.getFullInfo(stocks);

    if (reports.every(item => item.changedWeight === 50)) return [];

    const valuesMean = StockHelper.sumStockValues(stocks, true) / stocks.length;
    const increasedStock = reports.find(item => item.changedValue > valuesMean);
    const decreasedStock = reports.find(item => item.changedValue < valuesMean);

    const increasedStockDifference = increasedStock.changedValue - valuesMean;
    const decreasedStockDifference = valuesMean - decreasedStock.changedValue;

    const sellPercent = increasedStockDifference * 100 / increasedStock.changedValue;
    const buyPercent = decreasedStockDifference * 100 / decreasedStock.changedValue;

    return [
      {
        type: TradeTypeEnum.Sell,
        stock: increasedStock,
        percent: Math.round(sellPercent * 100) / 100,
      },
      {
        type: TradeTypeEnum.Buy,
        stock: decreasedStock,
        percent: Math.round(buyPercent * 100) / 100,
      },
    ];
  }
}

export default StockHelper;