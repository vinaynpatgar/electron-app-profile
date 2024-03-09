import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService, { IMAGE_SERVER_URL } from '../services/ApiService.js';
import '../css/ProfileForm.css';
import '../css/ShowProfile.css';

const ProfileForm = () => {
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        profilePhoto: null,
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleUpload = async (e) => {
        let formDataImage = new FormData();
        formDataImage.append("profilePhoto", e.target.files[0]);
        let res = await ApiService.postUpload(formDataImage);
        if (res) {
            showNotification(res.data.success, 'success');
            console.log(res);
            console.log(e.target.files);
            setFormData({
                ...formData,
                profilePhoto: res.data.record.path,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, emailId, phoneNumber, profilePhoto } = formData;

        if (!fullName || !profilePhoto) {
            showNotification("Full Name and Profile Photo are required fields.", 'info');
            return;
        }
        if (!emailId) {
            showNotification("emailId id required fields.", 'info');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailId && !emailRegex.test(emailId)) {
            showNotification("Invalid email format.", 'info');
            return;
        }

        console.log("fullName:", fullName);
        console.log("emailId:", emailId);
        console.log("phoneNumber:", phoneNumber);
        console.log("profilePhoto:", profilePhoto);

        let formDataSet = new FormData();
        formDataSet.append("fullName", fullName);
        formDataSet.append("emailId", emailId);
        formDataSet.append("phoneNumber", phoneNumber);
        formDataSet.append("profilePhoto", profilePhoto);


        ApiService.postData(formDataSet)
            .then((res) => {
                showNotification(res.data.success, 'success');
                setFormData({
                    fullName: '',
                    emailId: '',
                    phoneNumber: '',
                    profilePhoto: null,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const res = error.response;
                    showNotification(res.data.errorText, 'fail');
                } else {
                    showNotification("An error occurred", 'fail');
                }
            });

    };

    let image = `${IMAGE_SERVER_URL}/${formData?.profilePhoto}`;
    console.log(image);
    return (
        <div className="profile-form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className='left-form'>
                    {
                        formData?.profilePhoto && <img src={image} alt="Profile" className="profile-photo" width={100} height={100} />
                    }
                    <label>
                        <input type="file" name="profilePhoto" accept=".jpg, .jpeg, .png" onChange={handleUpload} id="photo-upload" style={{ display: 'none' }} />
                        <label htmlFor="photo-upload" className="custom-file-upload">Choose File</label>

                    </label>
                </div>
                <div className='info-form'>
                    <label>
                        Name:
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone Number:
                        <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                    </label>
                    <br />
                    <div className='btn'>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div className="profile-buttons">
                <Link to="/">
                    <button className="home-button">Go to Home</button>
                </Link>
                <Link to="/get-profile">
                    <button className="get-profile-button">Get Profile</button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileForm;
