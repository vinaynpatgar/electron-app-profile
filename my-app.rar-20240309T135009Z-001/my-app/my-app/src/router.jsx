import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowProfile from './components/Showprofile.jsx';
import ProfileForm from './components/PostProfile.jsx';
import Home from './components/Home.jsx';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/get-profile" element={<ShowProfile />} />
                <Route path="/add-profile" element={<ProfileForm />} />
            </Routes>
        </div>
    );
}

export default Router;
