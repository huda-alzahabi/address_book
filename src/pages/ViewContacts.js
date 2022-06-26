import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ViewContacts = () => {
  const nav = useNavigate();
  const [contacts, setContacts] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const getContacts = async () => {
    const res = await fetch(`http://127.0.0.1:3030/api/contact?id=` + user_id);
    const data = await res.json();
    return data;
  };

  //Get Contacts of the user
  useEffect(() => {
    const getData = async () => {
      const contactsFromServer = await getContacts();
      setContacts(contactsFromServer);
    };
    getData();
  }, []);

  const addContact = () => {
    nav("/AddContact");
  };

  const editContact = (id) => {
    nav("/EditContact", { state: { id } });
  };

  return (
    <div className="contactsbg">
      <table>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Relationship Status</th>
          <th>Location</th>
        </tr>
        {contacts.map((contact, i) => (
          <tr key={i}>
            <td>{contact.full_name} </td>
            <td>{contact.email} </td>
            <td>{contact.phone_number}</td>
            <td>{contact.relationship_status}</td>
            <td>
              ({contact.location.coordinates[0]},{" "}
              {contact.location.coordinates[1]})
            </td>
            <td>
              <FaEdit role="button" onClick={() => editContact(contact._id)} />
            </td>
          </tr>
        ))}
      </table>
      <div className="centerbtn">
        <Button
          color={"#916f5d"}
          text={"Add contact"}
          onClick={() => addContact()}
        />
      </div>
    </div>
  );
};

export default ViewContacts;
