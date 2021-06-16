import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { featuredPostsSelector, getFeaturedPosts } from "./Featured.slice"
import FeaturedItem from "./FeaturedItem/FeaturedItem"
import Loading from "../Loading/Loading"
import { Col } from "react-bootstrap"

const Featured = () => {
  const dispatch = useAppDispatch()
  const featuredPosts = useAppSelector(featuredPostsSelector)
  const { current, isSuccess, isFetching } = featuredPosts

  useEffect(() => {
    dispatch(getFeaturedPosts())
  }, [])

  return (
    <React.Fragment>
      {isSuccess
        ? current.map((el, i) => (
            <FeaturedItem {...el} key={"featured-item" + i} />
          ))
        : isFetching && (
            <Col xs={12}>
              <Loading height={217.88} />{" "}
            </Col>
          )}
    </React.Fragment>
  )
}

export default Featured
