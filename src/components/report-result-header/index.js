import { memo } from "react";
import { Table } from "semantic-ui-react";

const ReportResultHeader = memo(() => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Type</Table.HeaderCell>
      <Table.HeaderCell>Units</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Value</Table.HeaderCell>
      <Table.HeaderCell>Weight</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
));

export default ReportResultHeader;