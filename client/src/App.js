import React from "react";
import { Routes , Route} from "react-router-dom";
import HomePage from "./screens/HomePage";
import ChatPage from "./screens/ChatPage";
import "@fontsource/varela-round"; 
import "@fontsource/poppins";

const App = () => {
  return <div className="app__main">
   <Routes>
    <Route path='/' element={<HomePage />} exact />
    <Route path='/chats' element={<ChatPage />} />
   </Routes>
  </div>;
};

export default App;
