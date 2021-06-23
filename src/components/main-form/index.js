import { Fragment, useContext } from "react"
import { Button, Form } from "semantic-ui-react";
import NumberInput from "../number-input";
import StockTypeSelect from "../stock-type-select";
import FormManager from "../../shared/services/form-manager";
import { FormsContext } from "../../shared/services/contexts";

import './style.scss';

const MainForm = ({ onSubmit }) => {
    const [forms, setForms] = useContext(FormsContext);
    
    const changeField = (e, index) => {
        const form = forms[index];
        form[e.currentTarget.name] = e.currentTarget.value;
        setForms([...forms]);
    }

    const changeStockType = (value, index) => {
        const form = forms[index];
        form.stockType = value;
        setForms([...forms]);
    }

    const submitForm = () => {
        const result = FormManager.validateForms(forms);
        if (result.isValid) onSubmit();
        else setForms([...result.forms]);
    }

    return <Form className="P-main-form">
        {forms.map((item, index) => <Fragment key={item.id}>
            <h3>Company #{index + 1}</h3>
            <Form.Field error={item.__errors.name}>
                <label>Name</label>
                <input
                    name="name"
                    value={item.name}
                    onChange={e => changeField(e, index)} 
                />
            </Form.Field>

            <Form.Field error={item.__errors.stockType}>
                <label>Stock type</label>
                <StockTypeSelect
                    value={item.stockType}
                    onChange={value => changeStockType(value, index)}
                />
            </Form.Field>

            <Form.Field error={item.__errors.units}>
                <label>Units</label>
                <NumberInput
                    name="units"
                    value={item.units}
                    onChange={e => changeField(e, index)} 
                />
            </Form.Field>

            <Form.Field error={item.__errors.price}>
                <label>Price</label>
                <NumberInput
                    name="price"
                    value={item.price}
                    onChange={e => changeField(e, index)} 
                />
            </Form.Field>

            {!!item.price && !!item.units && <Form.Field error={item.__errors.value}>
                <label>Value</label>
                <input
                    readOnly={true}
                    value={item.price * item.units}
                />
            </Form.Field>}

            <Form.Field error={item.__errors.changedPrice}>
                <label>Price (End of the week)</label>
                <NumberInput
                    name="changedPrice"
                    value={item.changedPrice}
                    onChange={e => changeField(e, index)} 
                />
            </Form.Field>

            {!!item.changedPrice && !!item.units && <Form.Field>
                <label>Value (End of the week)</label>
                <input
                    readOnly={true}
                    value={item.changedPrice * item.units}
                />
            </Form.Field>}
        </Fragment>)}

        <Button color="blue" className="P-submit-button" onClick={submitForm}>Submit</Button>
    </Form>;
};

export default MainForm;