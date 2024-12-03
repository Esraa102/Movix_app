import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {
  HomePage,
  SignUp,
  SignIn,
  Movies,
  TVShows,
  Watch,
  Search,
} from "./pages";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authUser";
import { useEffect } from "react";
import { Loader, NotFound } from "./components";
import UserPage from "./pages/UserPage";

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="bg-black flex items-center justify-center relative z-20 h-screen w-full ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-black relative min-h-screen text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/movies"
          element={user ? <Movies /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="/tv-shows"
          element={user ? <TVShows /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="/user/:username"
          element={user ? <UserPage /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="/watch/:media_type/:id"
          element={user ? <Watch /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="/sign-up"
          element={!user ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
