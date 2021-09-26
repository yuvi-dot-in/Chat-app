import React, { useState , useEffect} from 'react';
import './App.css';
import Todo from './Todo'
import {SendRounded} from '@material-ui/icons'
import {List, Button, FormControl,Input,InputLabel } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'

function Chat(props) {
    const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    db.collection(props.roomCode).orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().Text,username: doc.data().username })))
    })
    
  },[]);

  const addTodo = (event) => {
    event.preventDefault()
    if (input.length > 0){
      db.collection(props.roomCode).add({
        Text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: props.userName
      })
      setTodos([...todos, input])

    }
    setInput('');
  }
    return (
        <div className='chat'>
            <h1>Personal Message App</h1>
     
     <form>
     <FormControl>
       <InputLabel  htmlFor="my-input">Type here</InputLabel>
       <Input  value={input} autoComplete='off' onChange={event => setInput(event.target.value)} id="my-input" aria-describedby="my-helper-text" />
     </FormControl>
     
     <Button onClick={addTodo} type='submit'  variant="contained" color="primary">
         Send  <SendRounded className='send-icon' />
     </Button><br/>
     
       {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
       {/* <button type='submit' onClick={addTodo} >Add Todo</button> */}
       
     </form>

     <List>
     {todos.map((todo) => (
         <Todo roomCode={props.roomCode} userName={props.userName} todo={todo} />
       ))}
     </List>
        </div>
    )
}

export default Chat
