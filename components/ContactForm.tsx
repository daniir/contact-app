import React, { Dispatch, SetStateAction, useState } from "react";
import { contactData } from "../dtos/contact.type";

const initialForm: contactData = {
  name: "",
  email: "",
  phone: "",
};

type props = {
  setRefresh: Dispatch<SetStateAction<number>>,
  refresh: number
};

export default function ContactForm({ setRefresh, refresh }: props) {
  const [contact, setContact] = useState<contactData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email } = contact;
    if (!name.trim() || !email.trim()) {
      return alert("Name and email are mandatory");
    }
    try {
      await fetch("/api/contacts/create", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "content-type": "application/json",
        },
      });
      setRefresh(refresh + 1);
      handleReset();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleReset = () => {
    setContact(initialForm);
  };

  return (
    <div>
      <h3 className="text-center">Add new contacts</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            id="nameInput"
            name="name"
            placeholder="Contact Name"
            value={contact.name}
            onChange={handleChange}
          />
          <label id="nameInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            id="emailInput"
            name="email"
            placeholder="Contact Email"
            value={contact.email}
            onChange={handleChange}
          />
          <label id="emailInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            id="phoneInput"
            name="phone"
            placeholder="Contact Phone"
            value={contact.phone}
            onChange={handleChange}
          />
          <label id="phoneInput">Phone</label>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-outline-primary" type="submit">
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}
