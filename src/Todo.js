import {  List, ListItem , ListItemText } from '@material-ui/core'
import {DeleteRounded} from '@material-ui/icons'
import React from 'react'
import db from './firebase'

function Todo(props) {
    return (
        <List className='todo_list'>
            <ListItem>

                <ListItemText primary={props.todo.todo} secondary={props.todo.time} />
                <DeleteRounded onClick={() => {db.collection('Todo').doc(props.todo.id).delete()}}/>
                {/* <Button ></Button> */}
            </ListItem>
        </List>
        
        // <div>
        //     <li>{props.todo}</li>
        // </div>
    )
}

export default Todo
