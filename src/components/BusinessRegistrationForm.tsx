import "../stylesheets/BusinessRegistration.css"
import React, { ChangeEvent, useState } from 'react';

export default function BusinessRegistrationForm() {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const registrationApi: string = "https://localhost:7079/api/business/register";

    async function registerBusiness() {
        let formData = {
            "Name" : name,
            "Location": location
        };

        console.log(JSON.stringify(formData));

        fetch(registrationApi, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log(response);
            if (response.ok)
                alert("Registered.");
            else
                throw new Error("Couldn't register");
        })
        .catch(error => {
            alert(error);
        });
    }


    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleLocationChange(event: ChangeEvent<HTMLInputElement>) {
        setLocation(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await registerBusiness();
    }

    return (
        <form id="businessRegistrationForm" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="businessName">Name</label>
            <input type="text" id="businessName" name="businessName" onChange={handleNameChange}></input>
            <label htmlFor="businessLocation">Location</label>
            <input type="text" id="businessLocation" name="businessLocation" onChange={handleLocationChange}></input>
            <input type="submit" value="Register" className="registerButton"></input>
        </form>
    )
}
