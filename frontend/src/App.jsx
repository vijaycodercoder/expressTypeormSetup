import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    name: '',
    number: '',
    age: '',
    isPublished: false,
  });
  const [list, setList] = useState();
  const [update, setUpdate] = useState();






  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {

        setList(data.data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          name="number"
          type="number"
          placeholder="number"
          value={user.number}
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          placeholder="age"
          value={user.age}
          onChange={handleChange}
        />
        <select
          name="isPublished"
          value={user.isPublished}
          onChange={handleChange}
        >
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <button type="submit">submit</button>

      </form>
      <button onClick={() => {
        console.log('update', user)
        fetch('http://localhost:3000/api/update/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('update', data)
            setList(data.data);
            setUser({
              name: '',
              number: '',
              age: '',
              isPublished: false,
            });

          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }} >Edit</button>


      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Number</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {list && list.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.age}</td>
              <td>{v.number}</td>

              <td>


                <button onClick={() => {
                  console.log(v.id);
                  fetch(`http://localhost:3000/api/${v.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setList(data.data);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                }}>Delete</button>



              </td>
              <td>


                <button onClick={() => {

                  fetch(`http://localhost:3000/api/${v.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      const updatedUser = data.data;
                      setUpdate(updatedUser)
                      const input = {
                        'id': updatedUser.id,
                        'name': updatedUser.name,
                        'age': updatedUser.age,
                        'number': updatedUser.number,
                        'isPublished': updatedUser.isPublished
                      }

                      console.log('input', input);
                      console.log('user', user);
                      setUser(input)
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                }}>Select</button>




              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  );
}

export default App;
