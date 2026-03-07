import PropTypes from 'prop-types';
import "@styles/global.css"

function Notification({ message, show }) {
    if (!show) return null;
  return (
    <div className="noti">
      {message}
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired
};