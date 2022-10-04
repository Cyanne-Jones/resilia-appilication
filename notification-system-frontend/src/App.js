import './App.css';
import { useEffect, useState } from 'react';
import { useNotificationStore } from './state/useNotificationStore';

function App() {

  const addNotifications = useNotificationStore(state => state.addNotifications);
  const userNotifications = useNotificationStore(state => state.notifications);
  const [ notifications, setNotifications ] = useState([]);
  const [ isNotificationMenuOpen, setIsNotificationMenuOpen ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {

    fetch("http://localhost:8000/api/v1/notifications")
      .then(response => {
        if(response.status === 200) {
          return response.json()
        } else {
          throw new Error("Couldn't fetch data")
        }
      })
      .then(res => {
        addNotifications(res.notifications);
        setNotifications(userNotifications);
      })
      .catch(error => {
        setNotifications(userNotifications);
        setErrorMessage(error.message);
        return console.log(error)});
  }, []);

  const mappedNotifications = notifications.map(notification => {

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
          {notifications[0] && <div className="notification-icon">!</div>}
        </button>
      </nav>
      <main>
        <div className={`notification-container ${isNotificationMenuOpen ? "open-menu" : "hidden-menu"}`}>
          {mappedNotifications}
        </div>
        {errorMessage}
        <p>Your news feed goes here</p>
      </main>
    </div>
  );
}

export default App;
