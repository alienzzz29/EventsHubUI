import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';

export const EventContext = createContext({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  fetchEvents: () => {}, // Add the fetchEvents function to the context
  isEventAlreadyAttended: () => {},
  currentPage: 1,
  totalPage: 1,
  perPage: 1,
});


export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [searchEventsQuery, setSearchEventsQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const handleEventsSearch = (query) => {
    setSearchEventsQuery(query.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Fetch events when the component mounts
      if(Cookies.get('user') && JSON.parse(Cookies.get('user'))?.user.roles.id == 3){
    fetchEvents();
    }
    
  }, []);

  const isEventAlreadyAttended = (eventID) => {
      if(events){
        return events.some(event => event && event?.id === eventID);
      } else{
        return false
      }
    
    }

  const fetchEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event_attendee/user/'+userID+'?page='+currentPage+(searchEventsQuery ? '&keyword=' + searchEventsQuery : ''), {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    if(response.data.eventAttendees){
      setEvents(response.data.eventAttendees);
      setTotalPage(response.data.pagination.total);
      setPerPage(response.data.pagination.per_page);
    }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (eventID) => { 
    try {
        const userID = JSON.parse(Cookies.get('user'))?.user.id
    const response = await axios.post(
        '/event_attendees',
        { 'user_id': userID, 'event_id': eventID },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
          }
        }  
      );
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, response.data];
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
      await axios.delete('/event_attendee/event/'+eventId+'/user/'+userID+'/delete',
      {
         headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
         }
      }
      ); // Your API endpoint for deleting events

      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, fetchEvents, isEventAlreadyAttended, currentPage, totalPage, perPage, setCurrentPage:(selectedPage) => setCurrentPage(selectedPage),handleEventsSearch, searchEventsQuery }}>
      {children}
    </EventContext.Provider>
  );
};
