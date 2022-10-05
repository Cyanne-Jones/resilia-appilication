import './App.css';
import { useEffect, useState } from 'react';
import { useNotificationStore } from './state/useNotificationStore';

function App() {

  const addNotifications = useNotificationStore(state => state.addNotifications);
  const userNotifications = useNotificationStore(state => state.notifications);
  const [ isNotificationMenuOpen, setIsNotificationMenuOpen ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {

    fetch("http://localhost:8000/api/v1/notifications")
      .then(response => response.json())
      .then(res => {
        addNotifications(res.notifications);
      })
      .catch(error => {
        setErrorMessage(error.message === 'Failed to fetch' && 'Failed to retrieve data from server. Please try again.');
      });
  }, []);

  const mappedNotifications = userNotifications.map(notification => {

    return(
    <div 
      className="notification" 
      key={notification.id}
    >
      <p className="notification-text">
        {notification.interactionFrom} {notification.interactionType} your <a href={notification.interactionLink}>{notification.interactionSubject}</a> on {new Date(notification.dateCreated).toDateString()}
      </p>
      {notification.comment && <p className="comment">"{notification.comment}"</p>}
    </div>
    )

  });

  const handleButtonPress = () => {
    isNotificationMenuOpen ? setIsNotificationMenuOpen(false) : setIsNotificationMenuOpen(true);
  }

  return (
    <div className="App">
      <nav>
        <h1>BookFace</h1>
        <button onClick={handleButtonPress}>
          Notifications
          {userNotifications && <div className="notification-icon">!</div>}
        </button>
      </nav>
      <main>
        <div className={`notification-container ${isNotificationMenuOpen ? "open-menu" : "hidden-menu"}`}>
          {userNotifications ? mappedNotifications : "No new notifications"}
        </div>
        {errorMessage}
        <p>Your news feed goes here</p>
      </main>
    </div>
  );
}

export default App;
