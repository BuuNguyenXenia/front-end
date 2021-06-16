/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { PATH } from "src/constants/path"
import ViewAllPosts from "src/components/ViewAllPosts/ViewAllPosts"
import ViewPostsItem from "src/components/ViewAllPosts/ViewPostsItem/ViewPostsItem"
import SearchPage from "src/pages/SearchPage/SearchPage"
import Profile from "src/components/Profile/Profile"
import Settings from "src/components/Settings/Settings"
import { LayoutRoute } from "./LayoutRoute"
import PrivateRoute from "./NavigationRoute/PrivateRoute"
import PrivateAdminRoute from "./NavigationRoute/PrivateAdminRoute"
import ManagePost from "src/pages/Admin/ManagePost"
import Notification from "src/components/Notification/Notification"
import LatestNews from "src/components/LatestNews/LatestNews"
import Reviews from "src/components/Reviews/Reviews"
import PublicRoute from "./NavigationRoute/PublicRoute"
import Login from "src/pages/Login/Login"
import CheckMailPassword from "src/pages/ResetPassword/CheckMail/CheckMailPassword"
import ResetPassword from "src/pages/ResetPassword/ResetPassword"
import SendEmail from "src/pages/ResetPassword/SendEmail/SendEmail"
import NotFoundPage from "src/pages/NotFoundPage/NotFoundPage"
import ScrollTopRoute from "./ScrollTopRoute"
import Register from "src/pages/Register/Register"
import CheckMailRegister from "src/pages/ResetPassword/CheckMail/CheckMailRegister"
import { useAppSelector } from "src/store/hooks"
import { userSelector } from "src/pages/User/User.slice"

export default function Routes() {
  const { role } = useAppSelector(userSelector)
  const [roleA, setRole] = useState(role)
  useEffect(() => {
    setRole(role)
  }, [role])

  return (
    <Router>
      <ScrollTopRoute />
      <Switch>
        //HomePage
        <LayoutRoute
          exact
          path={PATH.HOME}
          checkHome={true}
          component={
            <>
              <Reviews /> <LatestNews />
            </>
          }
        />
        <LayoutRoute
          exact
          path={PATH.ALL_POSTS}
          checkHome={false}
          component={<ViewAllPosts />}
        />
        <LayoutRoute
          exact
          path={PATH.SEARCH_POST}
          checkHome={false}
          component={<SearchPage />}
        />
        <PrivateRoute exact path={PATH.USER_PROFILE} component={<Profile />} />
        <PrivateRoute
          exact
          path={PATH.USER_SETTINGS}
          component={<Settings />}
        />
        <LayoutRoute
          path={`${PATH.ITEM_POST}/:postId`}
          checkHome={false}
          component={<ViewPostsItem />}
          exact
        />
        <PrivateAdminRoute
          path={PATH.MANAGE_POST}
          component={<ManagePost />}
          role={roleA}
        />
        //Login Page
        <PublicRoute
          restricted={true}
          component={Login}
          path={PATH.LOGIN}
          exact
        />
        <PublicRoute
          restricted={true}
          component={CheckMailPassword}
          path={PATH.CHECK_MAIL_PASSWORD}
          exact
        />
        <PublicRoute
          restricted={true}
          component={ResetPassword}
          path={PATH.RESET_PASSWORD}
          exact
        />
        <PublicRoute
          restricted={true}
          component={SendEmail}
          path={PATH.SEND_EMAIL}
          exact
        />
        //Register Page
        <PublicRoute
          restricted={true}
          component={Register}
          path={PATH.REGISTER}
          exact
        />
        <PublicRoute
          restricted={true}
          component={CheckMailRegister}
          path={PATH.CHECK_MAIL_REGISTER}
          exact
        />
        //NotFound page
        <PublicRoute
          restricted={false}
          component={NotFoundPage}
          path={PATH.NOT_FOUND}
        />
      </Switch>
    </Router>
  )
}
