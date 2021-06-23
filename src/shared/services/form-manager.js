import { StockTypeEnum } from "../constants/enums";

import StockHelper from './stock-helper';

class FormManager {

    static get initialState() {
        const state = {
            id: getPrimaryId(),
            name: '',
            units: '',
            price: '',
            changedPrice: '',
            stockType: null
        };

        Object.defineProperty(state, '__errors', { enumerable: false, writable: true, value: {} });

        return state;
    };

    static validateForms(forms) {
        let isValid = true;

        forms.forEach(item => {
            item.__errors = {};
            for (let key in item) {
                if (!item[key]) {
                    isValid = false;
                    item.__errors[key] = true;
                }
            }
        });

        const techStocks = forms.filter(item => item.stockType === StockTypeEnum.Tech);
        const bioTechStocks = forms.filter(item => item.stockType === StockTypeEnum.BioTech);

        const techStocksValue = StockHelper.sumStockValues(techStocks);
        const bioTechStocksValue = StockHelper.sumStockValues(bioTechStocks);

        if (techStocks.length !== bioTechStocks.length) {
            isValid = false;
            forms.map(item => item.__errors.stockType = true);
        }

        if (techStocksValue !== bioTechStocksValue) {
            isValid = false;
            forms.map(item => item.__errors.value = true);
        }

        return {
            forms,
            isValid
        };
    }
};

const getPrimaryId = (() => {
    let id = 0;
    return () => ++id;
})();

export default FormManager;