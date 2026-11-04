import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GetStarted from './component/GetStarted'
import Register from './component/Register'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Tasks from './component/Tasks'
import CreateTask from './component/CreateTask'
function App() {
 

  return (
    <>
   
      <Router>
        <Routes>
          <Route path='/' element={<GetStarted/>}/>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='task' element={<Tasks />}/>
          <Route path='create-task' element={<CreateTask />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
