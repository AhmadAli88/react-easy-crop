// Card.jsx

import PropTypes from 'prop-types';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
  );
};

// Define prop types for the Card component
Card.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are React nodes and required
  className: PropTypes.string, // Optional className as a string
};

// Define default props for the Card component
Card.defaultProps = {
  className: '', // Default className is an empty string
};
