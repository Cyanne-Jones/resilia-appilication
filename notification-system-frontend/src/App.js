import './App.css';
import { useEffect, useState } from 'react';
import { useNotificationStore } from './state/useNotificationStore';

function App() {

  const addNotifications = useNotificationStore(state => state.addNotifications);
  const [ notifications, setNotifications ] = useState([]);
  const [ isNotificationMenuOpen, setIsNotificationMenuOpen ] = useState(false);

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
      })
      .catch(error => console.log(error));
      const parsedNotifications = JSON.parse(localStorage.getItem('notification-storage'));
      setNotifications(parsedNotifications.state.notifications);
  }, []);

  const mappedNotifications = notifications.map(notification => {

    return(
    <div 
      className="notification" 
      key={notification.id}
    >
      <p>{notification.interactionFrom} {notification.interactionType} your <a href={notification.interactionLink}>{notification.interactionSubject}</a> on {new Date(notification.dateCreated).toDateString()}</p>
    </div>
    )

  });

  const handleButtonPress = () => {
    isNotificationMenuOpen ? setIsNotificationMenuOpen(false) : setIsNotificationMenuOpen(true);
    console.log(isNotificationMenuOpen);
  }

  return (
    <div className="App">
      <nav>
        <h1>BookFace</h1>
        <button onClick={handleButtonPress}>
          Notifications
        </button>
      </nav>
      <main>
        <div className={`notification-container ${isNotificationMenuOpen ? "open-menu" : "hidden-menu"}`}>
          {mappedNotifications}
        </div>
        <p>Your news feed</p>
      </main>
    </div>
  );
}

export default App;
