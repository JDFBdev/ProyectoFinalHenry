import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { MenuHeader } from '../Components/Navbar/MenuHeader/MenuHeader';
import Facturacion from '../Pages/Facturacion/Facturacion';
import Home from '../Pages/Home/Home';
import { Menu } from '../Pages/Menu';
import QueriesPage from '../Pages/Queries';



const Rout = () => {
  return (
    <>
      <BrowserRouter>
        <MenuHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/obout" element={<QueriesPage />} />
        <Route path="/facturar" element={<Facturacion />} />
        {/*<Route path="/SignUp" element={<SignUp />} />
                <Route path="/LogIn" element={<LogIn />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Rout
