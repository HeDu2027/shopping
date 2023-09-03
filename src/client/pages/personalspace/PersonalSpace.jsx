import React from "react";
import Topbar from "../../components/topbar/Topbar";

import './PersonalSpace.css'

import { v4 as uuidv4 } from 'uuid';
import img from '../../data/image/apple.jpg'
import {MdFavorite} from "react-icons/md";
import {ImProfile} from "react-icons/im";
import {GrHistory} from "react-icons/gr";
import {PiBrowsersLight, PiKeyReturnLight} from "react-icons/pi";
import {AiOutlineLike} from "react-icons/ai";
import {BiCommentDots} from "react-icons/bi";
import {RxEyeOpen} from "react-icons/rx";
import {Link} from "react-router-dom";
const PersonalSpace = () => {
 return(
     <div>
         <div className='topbar-wrapper'>
             <Topbar/>
         </div>

         <div className='personal-space-container'>

             <Link to='/personalspace'>
                 <div className='title-container'>
                     <div className='title-wrapper'>
                         personal space
                     </div>
                 </div>
             </Link>

             <div className='card-list-wrapper'>
                 {CardData.map(item=>(
                     <Card key={item.id} data={item}/>
                 ))}
             </div>

         </div>
     </div>
 )
}

const Card = ({data}) => {
  return(
      <div className='card-wrapper'>
          <Link to={data.path}>
              <img className='image-wrapper-personal-space' src={data.image} alt={data.name}/>
              <div className='name-wrapper'>
                  {data.icon}
                  {data.name}
              </div>
          </Link>
      </div>
  )
}

const CardData=[
    {id:uuidv4(),image:img,name:'favorite',icon:<MdFavorite />,path:'/favoritepage'},
    {id:uuidv4(),image:img,name:'purchase history',icon:<GrHistory />,path:'/purchasehistory'},
    {id:uuidv4(),image:img,name:'profile',icon:<ImProfile />,path:'/profile'},
    {id:uuidv4(),image:img,name:'browser history',icon:<PiBrowsersLight />,path:'/browserhistory'},
    {id:uuidv4(),image:img,name:'rated history',icon:<AiOutlineLike />,path:'/'},
    {id:uuidv4(),image:img,name:'comments history',icon:<BiCommentDots />,path:'/'},
]

export default PersonalSpace
