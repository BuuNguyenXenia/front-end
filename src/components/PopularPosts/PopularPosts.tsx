import React, { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getPopularPosts, popularPostsSelector } from "./PopularPost.slice"
import { Posts } from "./PopularPosts.styles"
import PopularPostsItem from "./PopularPostsItem/PopularPostsItem"
import Loading from "../Loading/Loading"

const PopularPosts = () => {
  const dispatch = useAppDispatch()
  const popularPosts = useAppSelector(popularPostsSelector)

  const { isSuccess, current, isFetching } = popularPosts
  // console.log(isSuccess)

  useEffect(() => {
    dispatch(getPopularPosts())
  }, [])
  return (
    <Posts className="mb-4">
      <Card className="posts-card card-wrapper">
        <Card.Header as="h4" className="posts-card-header wrapper-header">
          Popular Posts
        </Card.Header>
        <Card.Body className="posts-card-body">
          {isFetching && <Loading height={267} />}
          {isSuccess
            ? current.map((el, i) => (
                <PopularPostsItem {...el} key={"poppular-post-item" + i} />
              ))
            : null}
        </Card.Body>
      </Card>
    </Posts>
  )
}

export default PopularPosts
