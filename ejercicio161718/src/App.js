import { BrowserRouter as Router, Route, Routes, Link, Navigate, useParams } from 'react-router-dom'
import TaskComponent from '../src/components/pure/task';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import TaskListComponent from './components/container/task-list';
import DashboardPage from './dashboard/DashBoard';
import ProfilePage from './profile/ProfilePage';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TaskPage from './task/TaskPage';

function App() {

  let loggedIn = true
  ;

  return (
    <Router>
      {/* Redirecciones para proteger nuestras rutas */}
      <Routes>
        <Route path='/' element={loggedIn ?
          <Navigate to='/dashboard' />
          :
          <Navigate to='/login' />}>

        </Route>
        {/* Login route */}
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/dashboard' element={<DashboardPage />}></Route>

        <Route path='/tasks' element={loggedIn ?
          <TaskPage />
          :
          <Navigate to='/login' />}>
        </Route>
        <Route path='/profile' element={loggedIn ?
          <ProfilePage />
          :
          <Navigate to='/login' />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
