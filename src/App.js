import './App.css';
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login'
import Create from './Pages/Create';
import { AuthContext } from './store/Context';
import Post from './store/PostContext'
import ViewPost from './Pages/ViewPost';

function App() {

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user)
        // const uid = user.uid;
        // ...
      } else {
        console.log('user is not logged in');
      }
    });
  })

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/viewPost" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
      {/* <Spinner /> */}
    </div>
  );
}

export default App;