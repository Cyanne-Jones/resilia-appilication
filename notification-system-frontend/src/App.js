import './App.css';
import { useEffect, useState } from 'react';
import { useNotificationStore } from './state/useNotificationStore';

function App() {

  const addNotifications = useNotificationStore(state => state.addNotifications);
  const [ notifications, setNotifications ] = useState([]);

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
        const parsedNotifications = JSON.parse(localStorage.getItem('notification-storage'));
        setNotifications(parsedNotifications.state.notifications);
      })
      .catch(error => console.log(error));

  }, []);

  const mappedNotifications = notifications.map(notification => {
    return(
    <div 
      className="notification" 
      key={notification.id}
    >
      <p>{notification.id}</p>
    </div>
    )
  })



  return (
    <div className="App">
      <nav>
        <h1>BookFace</h1>
        <button>
          Notifications
        </button>
      </nav>
      <main>
        {mappedNotifications}
        <p>Your news feed</p>
      </main>
    </div>
  );
}

export default App;
