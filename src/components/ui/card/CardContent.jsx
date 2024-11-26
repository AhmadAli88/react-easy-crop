// CardContent.jsx
import PropTypes from 'prop-types';

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// Define prop types for the CardContent component
CardContent.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are React nodes and required
  className: PropTypes.string,        // Optional className as a string
};

// Define default props for the CardContent component
CardContent.defaultProps = {
  className: '',                      // Default className is an empty string
};
