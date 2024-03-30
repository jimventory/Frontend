import "../stylesheets/BusinessRegistration.css";
import React, { ChangeEvent, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function BusinessRegistrationForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const registrationApi: string =
    "https://localhost:7079/api/business/register";
  const { user, getAccessTokenSilently } = useAuth0();

  async function registerBusiness() {
    if (user === null) return;

    if (user?.sub === undefined) return;

    console.log(user?.sub);

    const idString = user?.sub.split("|");
    const idNumString = idString[1].substring(idString[1].length - 8);
    console.log(idNumString);
    const idNumUint = parseInt(idNumString, 16);

    console.log(`Id is ${idNumUint}`);

    let formData = {
      Name: name,
      Location: location,
      Id: idNumUint,
    };

    console.log(JSON.stringify(formData));

    fetch(registrationApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) alert("Registered.");
        else throw new Error("Couldn't register");
      })
      .catch((error) => {
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
      <h2>Register your business to get started.</h2>
      <label htmlFor="businessName">Business Name</label>
      <input
        type="text"
        id="businessName"
        name="businessName"
        onChange={handleNameChange}
      ></input>
      <label htmlFor="businessLocation">Business Location</label>
      <input
        type="text"
        id="businessLocation"
        name="businessLocation"
        onChange={handleLocationChange}
      ></input>
      <input
        type="submit"
        value="R E G I S T E R"
        className="registerButton"
      ></input>
    </form>
  );
}
