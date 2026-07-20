import React from 'react';
import './EmptyState.scss';

const EmptyState = React.memo(({ icon, title, message, action }) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message">{message}</p>}
      {action && action}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
export default EmptyState;