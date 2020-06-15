import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

//About Auth
import LandingPage from "./views/LandingPage/LandingPage.js";
import LandingWebPage from "./views/LandingPage/Category/LandingWebPage.js";
import LandingAndPage from "./views/LandingPage/Category/LandingAndPage.js";
import LandingiosPage from "./views/LandingPage/Category/LandingiosPage.js";
import LandingMFCPage from "./views/LandingPage/Category/LandingMFCPage.js";
import LandingGamePage from "./views/LandingPage/Category/LandingGamePage.js";
import LandingNormalPage from "./views/LandingPage/Category/LandingNormalPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import AppliedProjectPage from "./views/AppliedProjectPage/AppliedProjectPage.js";
import MadeProjectPage from "./views/MadeProjectPage/MadeProjectPage.js";
import CheckApplyPage from "./views/CheckApplyPage/CheckApplyPage.js"

import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadPage from "./views/UploadPage/UploadPage.js";
import DetailPostPage from "./views/DetailPostPage/DetailPostPage.js"

//import {BACK_URL } from '../components/Config.js';
//About User
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="wrapper">
        <NavBar />
        <div className="contentsWrapSpacer" />
        <Switch>
          <div className="contentsWrap">
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/web" component={Auth(LandingWebPage, null)} />
            <Route exact path="/android" component={Auth(LandingAndPage, null)} />
            <Route exact path="/ios" component={Auth(LandingiosPage, null)} />
            <Route exact path="/mfc" component={Auth(LandingMFCPage, null)} />
            <Route exact path="/game" component={Auth(LandingGamePage, null)} />
            <Route exact path="/normal" component={Auth(LandingNormalPage, null)} />

            <Route exact path="/AppliedProjectPage" component={Auth(AppliedProjectPage, true)} />
            <Route exact path="/MadeProjectPage" component={Auth(MadeProjectPage, true)} />

            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/upload" component={Auth(UploadPage, true)} />
            <Route exact path="/post/:postId" component={Auth(DetailPostPage, null)} />
            <Route exact path="/applyer/:postId" component={Auth(CheckApplyPage, null)} />
          </div>
          <Route component={Auth(NotFoundPage, null)} />
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
