import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '..';

const App = () => {
  return (
    <div>
      <SemanticDatepicker locale="en-US" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
