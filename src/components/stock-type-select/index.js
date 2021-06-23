import { memo } from "react";
import { Select } from "semantic-ui-react";
import { StockTypeEnum, StockTypeViewEnum } from '../../shared/constants/enums';

const stockTypeOptions = [
  {
    key: StockTypeEnum.Tech,
    text: StockTypeViewEnum[StockTypeEnum.Tech],
    value: StockTypeEnum.Tech,
  },
  {
    key: StockTypeEnum.BioTech,
    text: StockTypeViewEnum[StockTypeEnum.BioTech],
    value: StockTypeEnum.BioTech,
  },
];

const StockTypeSelect = memo(({ value, onChange }) => (
  <Select
    options={stockTypeOptions}
    value={value}
    onChange={(e, data) => onChange(data.value)}
  />
));

export default StockTypeSelect;