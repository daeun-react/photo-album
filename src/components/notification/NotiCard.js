import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "redux/configureStore";
import { actionCreators as drawerActions } from "redux/modules/drawer";
import { ROUTES } from "utils/constants";
import { realtime } from "firebase";

function NotiCard({ post_id, image_url, writer_name, writer_id }) {
  const { POST } = ROUTES;
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user?.uid);

  const handleNotiClick = () => {
    const notiDB = realtime.ref(`noti/${user_id}/list/${post_id}_${writer_id}`);
    notiDB.update({ read: true });
    history.push(`${POST}/${post_id}`);
    dispatch(drawerActions.toggleDrawer());
  };

  return (
    <Wrapper onClick={handleNotiClick}>
      <PostImage src={image_url} alt="" />
      <NotiText>
        <b>{writer_name}</b>님이 게시글에 댓글을 남겼습니다! :)
      </NotiText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
  border: 1px solid #f0f0f0;
  padding: 10px;

  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }

  & + & {
    margin-top: 10px;
  }
`;

const PostImage = styled.img`
  width: 100px;
  height: 100px;
`;

const NotiText = styled.p`
  margin-left: 10px;
  b {
    font-weight: 600;
  }
`;

export default NotiCard;
