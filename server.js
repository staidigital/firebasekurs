var firebase = require('firebase/app')
var firestore = require('firebase/firestore/lite')
const firebaseConfig = require('./firebaseConfig.js')

const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.json());

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(firebaseApp);

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function getTodos(db) {
    const todoCol = firestore.collection(db, 'Todo');
    const todoDocs = await firestore.getDocs(todoCol);
    const todoList = todoDocs.docs.map(doc => doc.data());
    return todoList;
}

/* getTodos(db).then(todos => console.log(todos)); */

/*  
Ettersom getTodos er async, bruker vi then() til å for å vente med å   
fortsette til getTodos er ferdig. 
*/

app.get('/todos', async (req, res) => {
    const todos = await getTodos(db);
    res.json(todos);
})

app.post('/newTodo', async (req, res) => {
    const { newTask } = req.body;
    try {
        const taskDocRef = firestore.doc(db, 'Todo', 'Tasks');
        const docSnap = await firestore.getDoc(taskDocRef);
        if (!docSnap.exists()) {
            // If the document doesn't exist, create it with newTask as the first item in an array
            await firestore.setDoc(taskDocRef, { task3: newTask });
        } else {
            // Adding new task
            await firestore.updateDoc(taskDocRef, { task3: newTask });
        }
        res.status(200).json({ message: 'Task added successfully to Todos' });
    } catch (error) {
        console.error('Error adding new task to Todos:', error);
        res.status(500).json({ error: 'Failed to add new task to Todos', details: error.toString() });
    }
});


