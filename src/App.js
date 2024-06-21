import React from "react";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import DepartmentFile from "./scenes/DepartmentFile";
import AddUser from "./scenes/User/AddUser";
import UserTable from "./scenes/User/UserTable";
import BooksTable from "./scenes/ManageBooks/BookTable";
import FileTable from "./scenes/ManageFile/FileTable";
import AddBook from "./scenes/ManageBooks/AddBook";
import CoopLibrary from "./scenes/ManageBooks/CoopLibrary.";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import Announcement from "./scenes/Announcement/Announcement";

function App() { 

  const [theme, colorMode] = useMode();

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="content">
              <Topbar />
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/file/:item/:item2" element={<DepartmentFile />} />
                <Route path="/userform" element={<AddUser />} />
                <Route path="/user" element={<UserTable />} />

                {/* BOOK  */}
                <Route path="/books" element={<BooksTable />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="/coopLibrary" element={<CoopLibrary />} />

                {/* FILES */}
                <Route path="/files" element={<FileTable />} />

                <Route path="/calendar" element={<Calendar />} />
                <Route path="/announcement" element={<Announcement />} />

                {/* FAQ  */}
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
};

export default App;