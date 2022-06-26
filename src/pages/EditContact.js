import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Map from "../components/Map";

const EditContact = () => {
  const nav = useNavigate();
  const myLocation = useLocation();

  // States for updating a contact
  const [contact_id, setId] = useState(0);
  const [contactInfo, setContactInfo] = useState({});

  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [relationship_status, setRelationship] = useState("");
  const [location, setLocation] = useState({});

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
      setLocation("" + data.locality + ", " + data.countryName);
    } catch (err) {
      console.log(err);
    }
  };
  const getContactInfo = async () => {
    const res = await fetch(
      " http://127.0.0.1:3030/api/contact/ById?id=" + contact_id
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const test = myLocation.state.id;
    setId(test);
    console.log(contact_id);
    if (contact_id != 0) {
      const getData = async () => {
        setContactInfo(await getContactInfo());
      };
      getData();
    }
  }, [contact_id]);

  useEffect(() => {
    setName(contactInfo.full_name);
    setEmail(contactInfo.email);
    setNumber(contactInfo.phone_number);
    setRelationship(contactInfo.relationship_status);
    setLocation(contactInfo.location);
  }, [contactInfo]);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the phone number change
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  // Handling the relationship status change
  const handleRelationship = (e) => {
    setRelationship(e.target.value);
  };

  // Handling the location change
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    editContact();
    setName("");
    setEmail("");
    setNumber("");
    setRelationship("");
    setLocation({});
    alert("Contact Successfully Updated");
    nav("/Contacts");
  };

  const backtoContacts = () => {
    nav("/Contacts");
  };

  //Sending the user to the users table in the db
  const editContact = async () => {
    setLocation({ locationName });
    let _data = {
      full_name,
      email,
      phone_number,
      relationship_status,
      location,
      user: localStorage.getItem("user_id"),
    };

    await fetch(`http://127.0.0.1:3030/api/contact/update?id=` + contact_id, {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("Bearer"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
  };

  return (
    <div className="background">
      <div className="container">
        <div>
          <h1>Edit Contact</h1>
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
          <label className="label">Old Location</label>
          <input
            className="input"
            value={location}
            placeholder={"Location"}
            type="text"
          />{" "}
          <label>New Location</label>
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
              text={"Update Contact"}
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
export default EditContact;
