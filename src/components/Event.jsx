import React, { useState,useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie';
import { LuTag,LuUser2,LuNavigation } from "react-icons/lu";
import { format } from 'date-fns'
import { useEventContext } from './EventContext';

const Event = () => {
  const { state } = useLocation();
  const { events, addEvent, removeEvent } = useEventContext();

  const [eventID, setEventID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [estAttendants, setEstAttendants] = useState('');
  const [venueName, setVenueName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventSchedStart, setEventSchedStart] = useState(new Date());
  const [eventSchedEnd, setEventSchedEnd] = useState(new Date());
  const [eventRegDeadline, setEventRegDeadline] = useState(new Date());
  const [userCookie, setUserCookie] = useState(Cookies.get('user'));

  const [eventAttended, setEventAttended] = useState([])
  const [onEventAlreadyAttended, setOnEventAlreadyAttended] = useState(false)



  useEffect(() => {
    const getEvents = async () => {
              try { const response = await axios.get('/event/'+state.id, {
                headers: {
                    'Accept': 'application/json',
                }
              });
              // console.log("Event.jsx"+response.data.event)
              setEventID(response.data.event.id)
              setName(response.data.event.name);
              setDescription(response.data.event.description);
              setCategoryName(response.data.event.category_id.name);
              setEstAttendants(response.data.event.est_attendants);
              setVenueName(response.data.event.venue_id.name);
              setEventLocation(response.data.event.location);
              setEventSchedStart(response.data.event.date_sched_start);
              setEventSchedEnd(response.data.event.date_sched_end);
              setEventRegDeadline(response.data.event.date_reg_deadline);
          } catch (e) {
              console.log(e);
          }
      }
      getEvents();
  }, []);

//   useEffect(() => {
//     const getAttended = async () =>{
//       try { 
//           const user = JSON.parse(userCookie)
//           const response = await axios.get('/users/events_attended/'+user?.user.id, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ` + user?.token 
//             }
//           });
//           // if (response.data.) {
          
//           // }
//         //   console.log(response.data)
//         // addToCart(response.data);
//         setEventAttended(response.data)
//       } catch (e) {
//           console.log(e);
//       }
     
//     }
//     getAttended();
//   }, [onEventAlreadyAttended]);

//   useEffect(() => {
//     setCart(eventAttended.user_events);
//     console.log(eventAttended)
// }, [eventAttended]);



  // useEffect(() => {
  //   // console.log('Updated eventAttended:', eventAttended);
  //   // const parsedEventAttended = JSON.parse(eventAttended);

  //   // console.log(eventAttended)

  //   const isEventIDExists = eventAttended.some(event => event.event_id === eventID);

  //   if (isEventIDExists) {
  //     // Event ID exists in the eventAttended array
  //     console.log('Event ID exists');
  //     setOnEventAlreadyAttended(true)
  //   } else {
  //     // Event ID doesn't exist in the eventAttended array
  //     console.log('Event ID does not exist');
  //   }

  // }, [eventAttended]); // Watch for changes in eventAttended
  
//   const attendEvent = async (id,name) => {
//     try {
//         // console.log("attendEvent:"+JSON.parse(userCookie))
//         // console.log("Name:"+name)
//         // await addToCart({eventID:id})
//         // setOnAttendEvent(true)
//         // console.log(cart)
        
//     } catch (err) {
//         console.log('Error: '+err.message);
//     }
// }
// const attendEvent = async (eventID) => {
//   const userID = JSON.parse(userCookie)?.user.id;
//   // console.log('UserID:', userID);
//   // console.log('EventID:', eventID);
//   try {
//     const response = await axios.post(
//       '/event_attendees',
//       { 'user_id': userID, 'event_id': eventID },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ` + JSON.parse(userCookie).token 
//         }
//       }
//     );
//     console.log(response.data.eventAttendee);
//     // navigate("/", { replace: true });
//     // addToCart(response.data.event);
//     // console.log("Event.jsx:"+JSON.stringify(cart))
//     addEvent(response.data.eventAttendee)
//   } catch (e) {
//     console.log(e);
//   }
// }
  const onRemoveEvent = async (id) => {
    try {
        console.log("removeEvent:"+JSON.parse(userCookie))
        // const response = await axios.delete(`/events/${id}`,
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer `+ userCookie.token
        //         }
        //     });
        // if (response.data.message == 'You need to be admin to enable action.') {
        //     // toast.error('You need to be admin to enable action!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        // } else {
        //     // toast.error('Product Deleted!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        //     const newProducts = products.filter((product) => product.id != id)
        //     setProducts(newProducts);
        // }
    } catch (err) {
        console.log('Error: '+err.message);
    }
}

const updateEvent = async (eventID) => {
    // if (cookies.user.user.role == '0') {
    //     // toast.error('You need to be admin to enable action!', {
    //     //     position: "bottom-right",
    //     //     autoClose: 5000,
    //     //     hideProgressBar: false,
    //     //     closeOnClick: true,
    //     //     pauseOnHover: true,
    //     //     draggable: true,
    //     //     progress: undefined,
    //     // });
    // } else {
    //     navigate('/edit', { state: { id: productId } });
    // }
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    // const updatedPost = { id, title: editTitle, datetime, body: editBody}
    try{
      // const response = await api.put('/posts/'+id, updatedPost)
      // setPosts(posts.map(post => post.id === id ? { ...response.data } : post ))
      // setEditTitle('')
      // setEditBody('')
      // navigate('/')
      console.log("updateEvent:"+JSON.parse(userCookie))
    }catch(err){
      console.log('Error: '+err.message)
    }
}
  return (
    <div className="items-start min-h-screen bg-base-200">
      <div className="container w-full lg:w-3/4 xl:w-2/3 mx-auto">
        {event && 
            <>
             <div>
             <h1 className="text-5xl font-bold pt-10 pb-5">{name}</h1>
             </div>
            <img src="" className="w-full h-96 shadow-2xl" />
            <div className='grid grid-cols-5 py-4 gap-12 place-items-center px-6'>
              
              <div className='text-sm flex '><LuTag size={18} className='mr-1.5' />{categoryName}</div>
              <div className='text-sm flex'><LuUser2 size={18} className='mr-1.5' />{estAttendants + '+'}</div>
              <div className='text-sm flex'>{format(new Date(eventSchedStart), 'MMM dd - ') + format(new Date(eventSchedEnd), 'MMM dd, yyyy') }</div>
              <div className='text-sm flex'><LuNavigation size={18} className='mr-1.5' />{venueName + ", " + eventLocation}</div>
              <div className='text-sm flex'>
                  {' Reg. Deadline: '+ format(new Date(eventRegDeadline), 'MMM dd, yyyy') }
              </div>
              
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-4 px-10'>
                <h1 className="text-3xl font-bold pb-3">About this Event</h1>
                <p>{description}</p>
              </div>
              <div className='flex items-center justify-center'>
                 
              {/* <button className="btn btn-primary px-8" onClick={() => addEvent(eventID)}>Attend</button> */}
              <button className="btn btn-primary px-8" onClick={() => Cookies.get('user') ? addEvent(eventID) : console.log("Count")}>Attend</button>
                
                  
              </div>
            </div>
            </>
        }
        {!event && 
            <>
            
            <div>
              <h1 className="text-5xl font-bold">Oops! Event not found</h1>
            </div>
            </>
        }
        
      </div>
    </div>

  )
}

export default Event