import React, {useEffect, useState} from 'react';
import Topbar from "../../../components/topbar/Topbar";
import './Profile.css';
import {useUser} from "../userContext/UserContext";
import axios from "axios";

const Profile = () => {
    const { user, setUser } = useUser(); // Use the useUser hook to get the current user's data
    console.log(user)
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('/user/api/getUserData', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data); // Update the user context with the fetched data
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [setUser]);

    if (!loaded) return null;

    return (
        <div className='profile-container'>
            <Topbar />

            <div className="profile-wrapper">
                <h1>User Profile</h1>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Personal infos</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>First Name:</strong> {user.firstName}</p>
                            <p><strong>Last Name:</strong> {user.lastName}</p>
                            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Contact infos</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>Street:</strong> {user.address.street}</p>
                            <p><strong>City:</strong> {user.address.city}</p>
                            <p><strong>State:</strong> {user.address.state}</p>
                            <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
                            <p><strong>Country:</strong> {user.address.country}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Account infos</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Preferences and Settings</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>Preferred Language:</strong> {user.language}</p>
                            <p><strong>Preferred Currency:</strong> {user.currency}</p>
                            <p><strong>Theme:</strong> {user.theme}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Social Media Accounts</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>Facebook:</strong> {user.socialAccounts.facebook}</p>
                            <p><strong>Twitter:</strong> {user.socialAccounts.twitter}</p>
                            <p><strong>Instagram:</strong> {user.socialAccounts.instagram}</p>
                            <p><strong>LinkedIn:</strong> {user.socialAccounts.linkedin}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            <h2>Security Questions</h2>
                        </div>
                    </div>

                    <div className='personal-infos-container'>
                        <div className='personal-infos-wrapper'>
                            <p><strong>Question:</strong> {user.question}</p>
                            <p><strong>Answer:</strong> {user.answer}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;
