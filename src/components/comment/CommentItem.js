import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Text } from "components/common";

function CommentItem({ user_name, user_profile, contents, insert_dt, type }) {
  return (
    <Wrapper>
      <UserImage src={user_profile} alt="user_profile" />
      <CommentItemWrapper>
        <Text bold>{user_name}</Text>
        <CommentText>{contents}</CommentText>
        <Text color="#8C8C8C">{moment(insert_dt).startOf("day").fromNow()}</Text>
      </CommentItemWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
  border-bottom: 1px solid #ececec;
  padding: 6px 0;
`;

const UserImage = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 10px;
  padding: 2px;
  border: 1px solid #333333;
  border-radius: 50%;
`;

const CommentItemWrapper = styled.div``;

const CommentText = styled.div`
  max-width: 200px;
  white-space: normal;
  word-wrap: break-word;
`;

export default CommentItem;
