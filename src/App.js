import React, { useState , useEffect} from 'react';
import './App.css';
import Todo from './Todo'
import {SendRounded} from '@material-ui/icons'
import {List, Button, FormControl,Input,InputLabel } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //fetch todos from firebase

  useEffect(()=>{
    db.collection('Todo').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().Text})))
      console.log(snapshot.docs)
    })
    
  },[]);

  const addTodo = (event) => {
    event.preventDefault()
    if (input.length > 0){
      db.collection('Todo').add({
        Text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setTodos([...todos, input])

    }
    setInput('');
  }

  return (
    <div className="App">
      <h1>Personal Message App</h1>
     
      <form>
      <FormControl>
        <InputLabel  htmlFor="my-input">Type here</InputLabel>
        <Input  value={input} onChange={event => setInput(event.target.value)} id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
      
      <Button   variant="contained" color="primary">
          Send  <SendRounded className='send-icon' />
      </Button><br/>
      
        {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
        {/* <button type='submit' onClick={addTodo} >Add Todo</button> */}
        
      </form>

      <List>
      {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </List>
        
    </div>
  );
}

export default App;
