import React from "react"
import { Redirect, Route } from "react-router-dom"
import Layouts from "src/components/Layouts/Layouts"
import { PATH } from "src/constants/path"
import { authenticated } from "src/helpers/isAuthen"
import LocalStorageService from "src/services/LocalStorageService/Storage.service"

const PrivateRoute = ({ component, ...rest }: any) => {
  const isLogin = authenticated()
  return (
    <Route
      {...rest}
      render={props =>
        !isLogin ? (
          <Redirect to={PATH.HOME} />
        ) : (
          <Layouts childComp={component} check={false} />
        )
      }
    />
  )
}

export default PrivateRoute
