import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Button from "../components/Button";

const ViewContacts = () => {
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
  console.log(contacts);

  return (
    <div>
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
              <FaEdit />
            </td>
            <td>
              <MdDeleteForever />
            </td>
          </tr>
        ))}
      </table>
      <Button
        color={"rgb(222 214 211)"}
        text={"Add contact"}
        onClick={addContact()}
      />
    </div>
  );
};

export default ViewContacts;
