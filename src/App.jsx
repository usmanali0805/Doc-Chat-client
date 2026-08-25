
import { Route, Routes } from 'react-router';
import './App.css'
import LandingPage from './page';
import LoginPage from './auth/login/page';
import SignupPage from './auth/signup/page';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
    </Routes>
  )
}

export default App;


// import { Route, Routes } from 'react-router';
// import './App.css'
// import LandingPage from './page';
// import LoginPage from './auth/login/page';
// import SignupPage from './auth/signup/page';

// function App() {

//   return (
//     <Routes>
//       <Route path='/' element={<LandingPage/>}/>
//       <Route path='/login' element={<LoginPage/>}/>
//       <Route path='/signup' element={<SignupPage/>}/>
//     </Routes>
//   )
// }

// export default App;