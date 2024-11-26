// CardTitle.jsx
import PropTypes from 'prop-types';

export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

// Define prop types for the CardTitle component
CardTitle.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are React nodes and required
  className: PropTypes.string,        // Optional className for additional styling
};

// Define default props for the CardTitle component
CardTitle.defaultProps = {
  className: '',                      // Default className is an empty string
};
