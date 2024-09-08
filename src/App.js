
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Customer/Home';

import Signup from './Customer/Signup';
import Login from './Customer/Login';
import Main from './Customer/Main';
import Admin from './Admin/Home';
import OfferManage from './Admin/OfferManage';
import MenuManage from './Admin/MenuManage';
import Menu from './Customer/Menu';
import Query from './Customer/Query';
import QueryManage from './Admin/QueryManage';
import GalleryManage from './Admin/GalleryManage';
import Gallery from './Customer/Gallery';
import FacilityManage from './Admin/FacilityManage';
import Facility from './Customer/Facility';
import ReservationManage from './Admin/ReservationManage';
import Reservation from './Customer/Reservation';
import About from './Customer/About';
import Review from './Customer/Review';
import ReviewManage from './Admin/ReviewManage';
import Staff from './Staff/Home';
import OrderDetails from './Customer/OrderDetails';






function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} /> 
    <Route path="/signup" element={<Signup/>} /> 
    <Route path="/login" element={<Login/>} /> 
    <Route path="/main" element={<Main/>} /> 
    <Route path="/admin" element={<Admin/>} /> 
    <Route path="/offermanage" element={<OfferManage/>} /> 
    <Route path="/menumanage" element={<MenuManage/>} /> 
    <Route path="/menu" element={<Menu/>} /> 
    <Route path="/query" element={<Query/>} /> 
    <Route path="/querymanage" element={<QueryManage/>} /> 
    <Route path="/gallerymanage" element={<GalleryManage/>} /> 
    <Route path="/gallery" element={<Gallery/>} /> 
    <Route path="/facilitymanage" element={<FacilityManage/>} /> 
    <Route path="/facility" element={<Facility/>} /> 
    <Route path="/reservationmanage" element={<ReservationManage/>} /> 
    <Route path="/reservation" element={<Reservation/>} /> 
    <Route path="/about" element={<About/>} /> 
    <Route path="/review" element={<Review/>} /> 
    <Route path="/reviewmanage" element={<ReviewManage/>} /> 
    <Route path="/staff" element={<Staff/>} /> 
    <Route path="/orderdetails" element={<OrderDetails/>} /> 
   
   
   
      </Routes>
      </BrowserRouter>
  );
}

export default App;

