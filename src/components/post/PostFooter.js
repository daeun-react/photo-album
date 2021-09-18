import React from "react";
import styled from "styled-components";
import { Text } from "components/common";

function PostFooter({ contents, comment_cnt }) {
  return (
    <PostFooterWrapper>
      <Text color="#fff" overflowHidden>
        {contents}
      </Text>
      <Text color="#ed234b" bold>
        댓글 {comment_cnt}개
      </Text>
    </PostFooterWrapper>
  );
}

export default PostFooter;

export const PostFooterWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
`;
