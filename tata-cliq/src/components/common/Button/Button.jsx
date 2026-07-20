import React from 'react';
import './Button.scss';

const Button = React.memo(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  loading,
  className,
  onClick,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className || ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className="btn__loader">
          <span className="btn__loader-dot" />
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;