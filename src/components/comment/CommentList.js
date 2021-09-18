import React, { useEffect } from "react";
import styled from "styled-components";
import { Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "redux/modules/comment";
import CommentItem from "components/comment/CommentItem";

function CommentList({ post_id, type }) {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, [dispatch, comment_list, post_id]);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  if (comment_list[post_id].length === 0) {
    return (
      <EmptyWrapper>
        <Empty description={"작성된 댓글이 없습니다"} />
      </EmptyWrapper>
    );
  }

  return (
    <Wrapper>
      {comment_list[post_id].map((comment) => (
        <CommentItem key={comment.id} {...comment} type={type} />
      ))}
    </Wrapper>
  );
}

export default CommentList;

const Wrapper = styled.div`
  height: calc(50vh - 100px);
  padding: 0px 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

const EmptyWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  width: 100%;
  height: 100%;
`;
