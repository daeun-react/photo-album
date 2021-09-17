import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as ImageActions } from "redux/modules/image";

function Upload() {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);

  const [imageName, setImageName] = useState("");
  const fileInput = useRef();
  const { Search } = Input;

  const handleImageUploadClick = () => {
    fileInput.current.click();
  };

  const uploadFB = () => {
    const image = fileInput.current.files[0];
    if (!image) {
      return window.alert("업로드할 이미지를 선택해주세요!");
    }
    setImageName(image.name);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      dispatch(ImageActions.setPreview(reader.result));
    };

    dispatch(ImageActions.uploadImageFB(image));
  };

  return (
    <>
      <input
        type="file"
        disabled={is_uploading}
        ref={fileInput}
        onChange={() => uploadFB()}
        style={{ display: "none" }}
      />

      <Search
        size="large"
        value={imageName}
        placeholder="이미지를 검색해주세요 :)"
        onSearch={handleImageUploadClick}
        enterButton
      />
    </>
  );
}

export default Upload;
