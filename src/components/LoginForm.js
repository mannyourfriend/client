import React, { useState } from 'react';

function LoginForm({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (username==null || password==null) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Handle login logic here
    try {
        const response = await fetch(`/log/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
          console.log('Login successful');
          onLogin(username);
        } 
        else {
          console.error('Login error:', response.status);
        }
      } 
      catch (error) {
        console.error('Catch Login error:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="loginUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;