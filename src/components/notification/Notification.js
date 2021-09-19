import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { realtime } from "firebase";
import { actionCreators as drawerActions } from "redux/modules/drawer";
import NotiCard from "components/notification/NotiCard";

function Notification() {
  const [noti, setNoti] = useState([]);

  const dispatch = useDispatch();
  const visible = useSelector((state) => state.drawer.isShow);
  const user = useSelector((state) => state.user.user);

  const toggleDrawer = () => {
    dispatch(drawerActions.toggleDrawer());
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        setNoti(_noti_list);
      } else {
        setNoti([]);
      }
    });
  }, [user]);

  return (
    <>
      <Drawer
        title="새로운 댓글 알림"
        placement="right"
        onClose={toggleDrawer}
        width={700}
        visible={visible}>
        {noti.map((n) => {
          return <NotiCard key={n.post_id} {...n} />;
        })}
      </Drawer>
    </>
  );
}

export default Notification;
