import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Map from "../components/Map";
const AddContact = () => {
  const nav = useNavigate();
  // States for adding a new contact
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [relationship_status, setRelationship] = useState("");
  //const [location, setLocation] = useState([]);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Location
  const [selectedPosition, setSelectedPosition] = useState([
    33.893791, 35.501778,
  ]);
  const [locationName, setLocationName] = useState("");

  //Get Location Name
  const getName = async (e) => {
    try {
      const res = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
          selectedPosition[0] +
          "&longitude=" +
          selectedPosition[1] +
          "&localityLanguage=en"
      );
      const data = await res.json();
      console.log(data);
      setLocationName("" + data.locality + ", " + data.countryName);
    } catch (err) {
      console.log(err);
    }
  };
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the phone number change
  const handleNumber = (e) => {
    setNumber(e.target.value);
    setSubmitted(false);
  };

  // Handling the relationship status change
  const handleRelationship = (e) => {
    setRelationship(e.target.value);
    setSubmitted(false);
  };

  // // Handling the location change
  // const handleLocation = (e) => {
  //   setLocation(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      full_name === "" ||
      email === "" ||
      phone_number === "" ||
      relationship_status === ""
      // location === []
    ) {
      setError(true);
    } else {
      addContact();
      setName("");
      setEmail("");
      setNumber("");
      setRelationship("");
      // setLocation([]);
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      ></div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  const backtoContacts = () => {
    nav("/Contacts");
  };

  //Sending the user to the users table in the db
  const addContact = async () => {
    let _data = {
      full_name,
      email,
      phone_number,
      relationship_status,
      location: locationName,
      user: localStorage.getItem("user_id"),
    };

    await fetch("http://127.0.0.1:3030/api/contact", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("Bearer"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    alert("Contact Successfully Added");
    nav("/Contacts");
  };

  return (
    <div className="background">
      <div className="container">
        <div>
          <h1>New Contact</h1>
        </div>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={full_name}
            placeholder={"Full Name"}
            type="text"
          />

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            placeholder={"Email"}
            type="email"
          />

          <label className="label">Phone Number</label>
          <input
            onChange={handleNumber}
            className="input"
            value={phone_number}
            placeholder={"Phone Number"}
            type="text"
          />
          <label className="label">Relationship Status</label>
          <input
            onChange={handleRelationship}
            className="input"
            value={relationship_status}
            placeholder={"Relationship Status"}
            type="text"
          />
          <label>Location</label>
          <br />
          <span>{locationName}</span>
          <Map
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            getName={getName}
            setLocationName={setLocationName}
          />
          <div className="centerbtn">
            <Button
              color={"#C29876"}
              text={"Save Contact"}
              onClick={handleSubmit}
            />
          </div>
          <h2
            role="button"
            style={{ color: " rgb(109, 93, 61)", cursor: "pointer" }}
            onClick={() => backtoContacts()}
          >
            Back
          </h2>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
