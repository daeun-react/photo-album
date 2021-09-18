import React from "react";
import moment from "moment";
import styled, { css } from "styled-components";
import { history } from "redux/configureStore";
import { ROUTES } from "utils/constants";
import { StyledButton } from "components/common/Styled";
import { Text } from "components/common";

function PostHeader({ type, user_info, insert_dt, is_me, id }) {
  const { WRITE } = ROUTES;
  const fontColor = type === "page" ? "#fff" : "#333";

  const historyChange = (id) => {
    history.push(`${WRITE}/${id}`);
  };

  return (
    <PostHeaderWrapper type={type}>
      <FlexBox>
        <UserImage src={user_info?.user_profile} alt="user_profile" />
        <Text margin="4px" bold color={fontColor}>
          {user_info?.user_name}
        </Text>
      </FlexBox>
      <FlexBox>
        <Text margin="4px" color={fontColor}>
          {moment(insert_dt).fromNow()}
        </Text>
        {is_me && type === "page" && (
          <StyledButton padding="4px" onClick={() => historyChange(id)}>
            수정
          </StyledButton>
        )}
      </FlexBox>
    </PostHeaderWrapper>
  );
}

export default PostHeader;

export const PostHeaderWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
  width: 100%;
  padding: 10px;

  ${(props) =>
    props.type === "page" &&
    css`
      position: absolute;
      top: 0px;
      left: 0px;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.3);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      border-bottom: 1px solid #ececec;
    `}
`;

const FlexBox = styled.div`
  ${({ theme }) => theme.flexSet()};
`;

const UserImage = styled.img`
  width: 28px;
  height: 28px;
  padding: 2px;
  border-radius: 100%;
  border: 1px solid #333333;
`;
