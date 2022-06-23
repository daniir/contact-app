import { Dispatch, SetStateAction } from 'react';
import { contacts } from '../dtos/contact.type';

type props = {
  contactsList: Array<contacts>,
  setRefresh: Dispatch<SetStateAction<number>>,
  refresh: number
}

export default function ContactData( { contactsList, refresh, setRefresh }: props ){

  const handleDelete = async(id: number) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      });
      setRefresh(refresh -= 1);
    } catch (error) {
      console.error("Error: ", error);
      
    }
  };


  return (
    <table className='table table-striped table-bordered text-center'>
      <thead className='table-dark'>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          contactsList.map( contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className='btn btn-outline-danger'
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};