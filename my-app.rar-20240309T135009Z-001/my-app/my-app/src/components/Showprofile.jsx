import React, {useEffect, useState } from "react";
import ApiService, { IMAGE_SERVER_URL, id } from "../services/ApiService";
import { Link } from 'react-router-dom';
import '../css/ShowProfile.css';
import { MdCreate } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import { PiXBold } from "react-icons/pi";

const ShowProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isNameUpdate, setisNameUpdate] = useState(false);
    const [error, setError] = useState(null);
    const [newName, setnewName] = useState('');
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    let fetchData = async () => {
        try {
            let { data } = await ApiService.getData(id);
            setData(data?.record);
        } catch (error) {
            setError(error.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleUpdateView = () => {
        setnewName('');
        setisNameUpdate(true);
    }

    const handleCancelUpdateName = () => {
        setnewName('');
        setisNameUpdate(false);
    }

    const handleUpdateName = async () => {
        if (newName !== "") {
            let response = await ApiService.putNameUpdate(id, newName);
            console.log(response);
            fetchData();
            setnewName('');
            setisNameUpdate(false);
            showNotification(response.data.success, 'success');
        } else {
            showNotification("Please enter the New Name", 'info');
        }
    }

    const handlenewName = (e) => {
        setnewName(e.target.value);
    }
    let image = `${IMAGE_SERVER_URL}/${data?.profilePhoto}`;
    console.log(image);

    return (
        <>
            <div className="profile-container">
                <h2>Profile Information</h2>
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="profile-details">
                        <img src={image} alt="Profile" className="profile-photo" width={100} height={100} />
                        <p><strong>Email:</strong> {data?.emailId}</p>
                        <div className="flexContainer">
                            <div><strong>Full Name:&nbsp;</strong></div>
                            <div>
                                {
                                    isNameUpdate ? (
                                        <div className="fullNameContainer">
                                            <div>
                                                <input type="text" name="fullName" value={newName} onChange={handlenewName} className="inputContainer" />
                                            </div>
                                            <div>
                                                <PiCheckBold onClick={handleUpdateName} className="greenIcon" />
                                                <PiXBold onClick={handleCancelUpdateName} className="redIcon" />
                                            </div>
                                        </div>
                                    ) : (
                                        <span>
                                            {data?.fullName} &nbsp;<MdCreate onClick={handleUpdateView} className="editIcon" />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                                <p><strong>Phone Number:</strong> {data?.phoneNumber}</p>
                    </div>
                )}
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div className="profile-buttons">
                <Link to="/">
                    <button className="home-button">Go to Home</button>
                </Link>
                <Link to="/add-profile">
                    <button className="add-profile-button">Add Profile</button>
                </Link>
            </div>
        </>
    );
}

export default ShowProfile;
