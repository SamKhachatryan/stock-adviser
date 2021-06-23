import React, { memo, useState } from "react";
import { Button } from 'semantic-ui-react';
import ReportResult from "../report-result";
import MainForm from "../main-form";
import FormManager from "../../shared/services/form-manager";
import { FormsContext } from "../../shared/services/contexts";

import './style.scss';

const ReportGenerator = memo(() => {
    const [pendingForms, setPendingForms] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const discardReport = () => {
        showReport && setShowReport(false);
        setPendingForms(null)
    }

    const openPendingForms = () => {
        showReport && setShowReport(false);
        setPendingForms([FormManager.initialState, FormManager.initialState])
    }

    return (
        <FormsContext.Provider value={[pendingForms, setPendingForms]}>
            <main className="P-report-wrapper">
                {showReport ? <>
                    <ReportResult />
                    <Button className="P-reset-button" color="blue" onClick={discardReport}>Reset</Button>
                </> : <>
                    {pendingForms ? <Button className="P-discard-button" color="red" onClick={discardReport}>
                        Discard report
                    </Button> : <Button className="P-generate-button" color="blue" onClick={openPendingForms}>
                        Generate new report
                    </Button>}

                    {pendingForms && <MainForm onSubmit={() => setShowReport(true)} />}
                </>}
            </main>
        </FormsContext.Provider>
    );
});

export default ReportGenerator;