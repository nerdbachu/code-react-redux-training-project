import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import CoursesPage from "./courses/CoursePage";
import ManageCoursePage from "./courses/ManageCoursePage";
import ManageAuthorPage from "./author/ManageAuthorPage";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound";
import TestPage from "./TestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorsPage from "./author/AuthorsPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/test" component={TestPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course/" component={ManageCoursePage} />
        <Route path="/authors/" component={AuthorsPage} />
        <Route path="/author/:authorSlug" component={ManageAuthorPage} />
        <Route path="/author" component={ManageAuthorPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
