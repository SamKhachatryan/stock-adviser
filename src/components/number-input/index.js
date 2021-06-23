import { memo } from "react";
import { decimalFieldPattern } from "../../shared/constants/validations";

const NumberInput = memo(props => {
  const onChange = e => {
    e.currentTarget.validity.valid && props.onChange(e);
  }

  return <input
    {...props}
    pattern={decimalFieldPattern}
    onChange={onChange}
  />;
});

export default NumberInput;