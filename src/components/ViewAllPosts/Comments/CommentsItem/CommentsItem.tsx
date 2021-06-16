import React from "react"
import { Comment } from "semantic-ui-react"
import { CommentsPostItem } from "./CommentsItem.styles"
import { formatDate } from "../../../../helpers/date"
import TimeAgo from "react-timeago"
import frenchStrings from "react-timeago/lib/language-strings/en"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

const CommentsItem = ({ userInfo, body, createdAt }) => {
  const formatter = buildFormatter(frenchStrings)
  return (
    <CommentsPostItem>
      <Comment className="user-comments">
        <Comment.Avatar className="user-avatar" as="a" src={userInfo.avatar} />
        <Comment.Content className="user-comments-content">
          <Comment.Author className="user-comments-author">
            {userInfo.name}
          </Comment.Author>
          <Comment.Metadata>
            <TimeAgo date={createdAt} formatter={formatter} />
          </Comment.Metadata>
          <Comment.Text>
            <p>{body}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </CommentsPostItem>
  )
}

export default CommentsItem
