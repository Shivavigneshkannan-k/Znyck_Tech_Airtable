import { Routes, Route, Navigate} from "react-router";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import ErrorPage from "./Pages/Error";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TableCreator from "./Pages/TablePage";
import { useEffect } from "react";
import { getUser } from "./store/userThunks";
import ViewTables from "./Pages/ViewTables";
import TablePage from "./Pages/TablePage";
import { getTables } from "./store/tableThunk";
const App = () => {
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!user){
      dispatch(getUser())
    }
    if(user){
      dispatch(getTables());
    }
    console.log("from app.jsx")
  },[user])
  return (
    <>
      <div><Toaster/></div>
      <Navbar/>
      <Routes>
          <Route path="/" element={user ? <ViewTables /> :<Navigate to="/login" replace />} />
          <Route path="/table/:tableIndex" element={user ? <TablePage/> :<Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <LoginPage /> :<Navigate to="/" replace />} />
          <Route path="/signup" element={!user ? <SignupPage /> :<Navigate to="/" replace />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
      </>
  );
};

export default App;
