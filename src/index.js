import React from 'react';
import ReactDOM from 'react-dom';
import ReportGenerator from './components/report-generator';

import './assets/styles/main.scss';

const App = () => (
  <ReportGenerator />
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
