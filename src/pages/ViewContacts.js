import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ViewContacts = () => {
  const nav = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [option_id, setId] = useState("");

  const [contactsFiltered, setFiltered] = useState([]);

  const user_id = localStorage.getItem("user_id");
  const getContacts = async () => {
    const res = await fetch(`http://127.0.0.1:3030/api/contact?id=` + user_id);
    const data = await res.json();
    return data;
  };
  const getData = async () => {
    const contactsFromServer = await getContacts();
    setContacts(contactsFromServer);
    setFiltered(contactsFromServer);
  };
  //Get Contacts of the user
  useEffect(() => {
    getData();
  }, []);

  const addContact = () => {
    nav("/AddContact");
  };

  const editContact = (id) => {
    nav("/EditContact", { state: { id } });
  };
  const deleteContact = async (id) => {
    await fetch(`http://127.0.0.1:3030/api/contact?id=` + id, {
      method: "delete",
      headers: {
        "x-access-token": localStorage.getItem("Bearer"),
        "Content-Type": "application/json",
      },
    });
    alert("Contact Successfully Deleted");
    getData();
  };
  const filterContacts = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    result = contactsFiltered.filter((contacts) => {
      return (
        contacts.full_name.search(value) != -1 ||
        contacts.phone_number.search(value) != -1 ||
        contacts.email.search(value) != -1 ||
        contacts.relationship_status.search(value) != -1
      );
    });
    setContacts(result);
  };

  return (
    <div className="contactsbg">
      <div className="filter">
        <label className="search">
          Filter Search{" "}
          <input
            className="box"
            type="text"
            onChange={(e) => filterContacts(e)}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Relationship Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
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
                <FaEdit
                  role="button"
                  onClick={() => editContact(contact._id)}
                />
              </td>
              <td>
                <MdDeleteForever
                  role="button"
                  onClick={() => deleteContact(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
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
