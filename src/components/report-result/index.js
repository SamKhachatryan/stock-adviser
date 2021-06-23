import { memo, useMemo, useContext } from "react";
import { Table } from "semantic-ui-react";
import { StockTypeViewEnum } from "../../shared/constants/enums";
import { FormsContext } from "../../shared/services/contexts";
import StockHelper from "../../shared/services/stock-helper";
import ReportResultHeader from "../report-result-header";
import TradeAdviser from "../trade-adviser";

const ReportResult = memo(() => {
  const [forms] = useContext(FormsContext);
  const result = useMemo(() => StockHelper.getFullInfo(forms), [forms]);

  return <div>
    <h1>Start of the week</h1>

    <Table celled>
      <ReportResultHeader />

      <Table.Body>
        {result.map(item => <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{StockTypeViewEnum[item.stockType]}</Table.Cell>
          <Table.Cell>{item.units}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.value}</Table.Cell>
          <Table.Cell>{item.weight}%</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>

    <h1>End of the week</h1>

    <Table celled>
      <ReportResultHeader />

      <Table.Body>
        {result.map(item => <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{StockTypeViewEnum[item.stockType]}</Table.Cell>
          <Table.Cell>{item.units}</Table.Cell>
          <Table.Cell>{item.changedPrice}</Table.Cell>
          <Table.Cell>{item.changedValue}</Table.Cell>
          <Table.Cell>{item.changedWeight}%</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>

    <TradeAdviser />
  </div>;
});

export default ReportResult;