import './App.css';
import HomePage from './pages/HomePage';
import Signin from './components/signin';
import Signup from './components/signup';
import MainPage from './pages/mainPage';
import CreateReview from './pages/createReview';
import ProfilePage from './pages/profilePage';
import ReviewPage from './pages/reviewPage';
import { useEffect } from 'react';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/main' element={<MainPage/>}/>
    <Route path='/create' element={<CreateReview/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    <Route path='/review' element={<ReviewPage/>}/>
    <Route path='/' element={<HomePage/>}/>
  </Route>
))

function App() {
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
   window.addEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
