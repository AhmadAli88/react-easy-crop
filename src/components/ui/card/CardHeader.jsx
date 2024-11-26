// CardHeader.jsx

import PropTypes from 'prop-types';

export const CardHeader = ({ children, className }) => {
  return <div className={`border-b p-4 ${className}`}>{children}</div>;
};

// Define prop types for the CardHeader component
CardHeader.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are React nodes and required
  className: PropTypes.string, // Optional className as a string
};

// Define default props for the CardHeader component
CardHeader.defaultProps = {
  className: '', // Default className is an empty string
};
