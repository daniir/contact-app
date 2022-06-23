import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { contacts } from "../dtos/contact.type";
import ContactData from "./ContactData";
import Spinner from "./Spinner";

type props = {
  contactList: Array<contacts>
  loading: boolean
  setRefresh: Dispatch<SetStateAction<number>>,
  refresh: number
}

export default function Contacts({ contactList, loading, refresh, setRefresh }: props) {
  return (
    <div>
      {loading ? (
        <Spinner/>
      ) : (
        <div>
          <h2>Contact List</h2>
          {contactList.length !== 0 ? (
            <ContactData contactsList={contactList} refresh={refresh} setRefresh={setRefresh}/>
          ) : (
            <p>Contact list is empty</p>
          )}
        </div>
      )}
    </div>
  );
}
