import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found__content">
          <h1 className="not-found__code">404</h1>
          <h2 className="not-found__title">Page Not Found</h2>
          <p className="not-found__message">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;