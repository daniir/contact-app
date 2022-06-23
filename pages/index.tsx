import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { contacts } from '../dtos/contact.type';
import Contacts from '../components/Contacts'
import ContactForm from '../components/ContactForm'
import NavBar from '../components/NavBar';


const Home: NextPage = () => {

  const [contactList, setContactList] = useState<Array<contacts> | []>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState<number>(0)

  const getContactList = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contacts/read", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setContactList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getContactList();
  }, [refresh]);

  return (
    <div>
      <NavBar />
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <ContactForm refresh={refresh} setRefresh={setRefresh} />
          </div>
          <div className="col">
            <Contacts
              contactList={contactList}
              loading={loading}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
