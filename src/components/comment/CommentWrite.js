import React, { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "redux/modules/comment";
import styled from "styled-components";
import { StyledButton } from "components/common/Styled";

function CommentWrite({ post_id }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentAdd = () => {
    dispatch(commentActions.addCommentFB(post_id, commentText));
    setCommentText("");
  };

  return (
    <Wrapper>
      <Input
        placeholder="댓글 내용을 입력해주세요 :)"
        size="large"
        value={commentText}
        onChange={handleCommentTextChange}
        onPressEnter={handleCommentAdd}
      />
      <Button onClick={handleCommentAdd}>입력</Button>
    </Wrapper>
  );
}

export default CommentWrite;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  margin: 10px 0;
  position: relative;
`;

const Button = styled(StyledButton)`
  position: absolute;
  right: 8px;
`;
