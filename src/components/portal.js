/* global document */

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, query }) =>
  ReactDOM.createPortal(children, document.querySelector(query));

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  query: PropTypes.string,
};

Portal.defaultProps = {
  query: 'body',
};

export default Portal;
