import React, { useState } from 'react';

function RegisterForm( {onRegister}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (username==null || password==null) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Handle registration logic here
    try {
        const response = await fetch(`/add/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
          console.log('Registration successful');
          onRegister(username);
        } 
        else {
          console.error('Registration error:', response.status);
        }
      } 
      catch (error) {
        console.error('Try Registration error:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="RegisterUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="RegisterPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;