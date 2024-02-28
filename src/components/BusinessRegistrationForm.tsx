import "../stylesheets/BusinessRegistration.css"

export default function BusinessRegistrationForm() {

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        alert("Trying to register.");
    }

    return (
        <form id="businessRegistrationForm" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="businessName">Name</label>
            <input type="text" id="businessName" name="businessName"></input>
            <label htmlFor="businessLocation">Location</label>
            <input type="text" id="businessLocation" name="businessLocation"></input>
            <input type="submit" value="Register" className="registerButton"></input>
        </form>
    )
}