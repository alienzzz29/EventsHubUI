import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// const Events = ({events}) => {
const Events = () => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getEvents = async () => {
            try {
                  const response = await axios.get('/events', {
                      headers: {
                          'Accept': 'application/json',
                          // 'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                      }
                  });
                  // if(response.data){
                  //     console.log(response.data.events.data)
                  // }
                  // console.log(JSON.parse(Cookies.get('user')).token)
                  setEvents(response.data.events.data)
              } catch (e) {
                  console.log(e);
              }
          }
          getEvents();
      }, []);

      const onDetails = (eventId) => {
        // if (cookies.user.user.role == '0') {
        //     toast.error('You need to be admin to enable action!', {
        //         position: "bottom-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // } else {
            navigate('/events/'+eventId, { state: { id: eventId } });
        // }
      }
  return (
    <>
    <div className="flex flex-col w-full border-opacity-50">
        <div className="grid h-24 card bg-base-300 rounded-box place-items-center">
            <div className="join">
                <div>
                    <div>
                    <input className="input input-bordered join-item" placeholder="Search"/>
                    </div>
                </div>
               
                <div className="indicator">
                    <button className="btn join-item">Search</button>
                </div>
            </div>
        </div>
       
    </div>
    <div className="hero min-h-fit bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-xl">
                <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Event</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(events) ? (
                        events.map((event,index) =>(
                        <tr key={index}>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask w-44 h-28">
                                    <img src="" alt="Event Image" />
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>
                            {event.name}
                            </td>
                            <td>
                            {event.location}
                            </td>
                            <th>
                            {/* <Link to = {'/events/'+ event.id} >
                            <button className="btn btn-ghost btn-xs">details</button>
                            </Link> */}
                            <button className="btn btn-ghost btn-xs" onClick={() => onDetails(event.id)}>details</button>
                            </th>
                        </tr>
                        ))
                        ) : (
                            <tr>
                            <td colSpan="4">No events available</td>
                            </tr>

                        )
                    }
                    
                    </tbody>
                    
                </table>
                </div>
                <div className="join">
                <button className="join-item btn">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">99</button>
                <button className="join-item btn">100</button>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Events