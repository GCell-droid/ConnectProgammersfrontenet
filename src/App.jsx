import './App.css'
import { BrowserRouter ,Route,Routes} from 'react-router'
import Body from './Body'
import Login from './components/Login'
// import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Error from './components/Error'
import Connections from './components/Connections'
import Request from './components/Request'
import Chat from './components/Chat'

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}> 
          <Route path='/' element={<Feed/>}/> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/connections' element={<Connections/>}/>
          <Route path='/requests' element={<Request/>}/>
          <Route path='/chat/:toUserId' element={<Chat/>}/>
          <Route path='/error' element={<Error/>}/>
          <Route path='*' element={<Error message={"Page Not Found"}/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
  )
}

export default App
