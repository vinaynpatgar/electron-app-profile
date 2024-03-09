import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';  

const Home = () => {
    return (
        <div className='profile-container'>
            <h1 className='profile-heading'>Welcome to Your Profile Page</h1>
            <div className='button-container'>
                <Link to='/get-profile'>
                    <button className='get-profile-button'>View Profile</button>
                </Link>

                <Link to='/add-profile'>
                    <button className='add-profile-button'>Add Profile</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
