import { memo, useMemo, useContext } from "react";
import { TradeTypeViewEnum } from "../../shared/constants/enums";
import { FormsContext } from "../../shared/services/contexts";
import StockHelper from "../../shared/services/stock-helper";

const TradeAdviser = memo(() => {
  const [forms] = useContext(FormsContext);
  const trades = useMemo(() => StockHelper.adviseEqualizationTrades(forms), [forms]);

  if (!trades.length) return <h2>There were nothing to do :)</h2>

  return trades.map(({ type, stock, percent}) => <h3 key={type}>
    {stock.name} (#{stock.id}) - {TradeTypeViewEnum[type]} {percent}%
  </h3>);
});

export default TradeAdviser;