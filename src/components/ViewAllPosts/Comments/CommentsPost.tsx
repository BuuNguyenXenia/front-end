import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Button, Comment, Form } from "semantic-ui-react"
import { MSG } from "src/constants/showMsg"
import LocalStorageService from "src/services/LocalStorageService/Storage.service"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { addComment, createCommentPost } from "../Posts.slice"
import CommentsItem from "./CommentsItem/CommentsItem"

const CommentsPost = ({ postId, comments, avatar, email, name }) => {
  const [userComment, setUserComment] = useState<string>("")
  const dispatch = useAppDispatch()

  const onChangeComment = e => {
    setUserComment(e.target.value)
  }

  console.log(comments)
  const HandleChangeComment = (postId: string, value: string) => {
    let accessToken = LocalStorageService.getItem("accessToken")
    var date = new Date()
    let data = {
      post: postId,
      body: value,
      createdAt: date,
      userInfo: {
        avatar: avatar,
        email: email,
        name: name
      }
    }
    const params = {
      _id: postId,
      body: value
    }

    if (accessToken) {
      dispatch(createCommentPost(params))
      dispatch(addComment(data))
      setUserComment("")
    } else {
      toast.error(MSG.NOT_LOGIN_ERROR)
    }
  }
  return (
    <Comment.Group className="mr-0">
      {comments.data &&
        comments.data.map((el, i) => (
          <CommentsItem {...el} key={"comment-item-" + i} />
        ))}
      <Form reply>
        <Form.TextArea onChange={onChangeComment} value={userComment} />
        <Button
          type="submit"
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
          onClick={() => HandleChangeComment(postId, userComment)}
        />
      </Form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Comment.Group>
  )
}

export default CommentsPost
