// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #007BFF;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 80%;
  max-width: 600px;
`;

const ListItem = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://test1127lb-1653189751.ap-northeast-2.elb.amazonaws.com') // public 폴더에 data.json 파일 위치
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the JSON file:', error);
        setError('Failed to load data.');
      });
  }, []);

  return (
    <Container>
      <Header>데이터 출력</Header>
      {error ? (
        <p>{error}</p>
      ) : (
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>
              <strong>UserName : {item.username}</strong>
              <p>Email : {item.email}</p>
              <p>Phone Number : {item.phonenumber}</p>
              <p>PassWord: {item.password}</p>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;