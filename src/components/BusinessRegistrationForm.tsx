import "../stylesheets/BusinessRegistration.css";
import React, { ChangeEvent, useState } from "react";
import { getFullPath, API_ROUTES } from "../apis/business";
import useBusinessId from "../hooks/useBusinessId";

export default function BusinessRegistrationForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const businessId = useBusinessId();

  async function registerBusiness() {
    try {
      if (businessId === null) throw new Error("Bad business Id.");

      // TODO:
      // Currently, registration API is not authenticated.  In the future,
      // this will need an access token.
      const headers = {
        "Content-Type": "application/json",
      };

      // TODO:
      // In the future, when authentication is added to business controller,
      // we should consider removing the Id param from here.
      // And instead have the backend assign it based on the claims.
      const formData = {
        Name: name,
        Location: location,
        Id: businessId,
      };

      const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(formData),
      };

      const response = await fetch(getFullPath(API_ROUTES.REGISTER), options);

      if (response.ok === false)
        throw new Error("Failed to register business.");

      // If execution reaches here, we successfully registered the business.

      alert(`${name} has been registered!`);
    } catch (e) {
      alert(`Something went wrong trying to register ${name}.  We apologize.`);
    }
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
