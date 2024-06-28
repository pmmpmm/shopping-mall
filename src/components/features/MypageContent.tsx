import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import useUser from "@/hooks/useUser";
import { UseLoginContext } from "@/context/LoginContext";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import FieldFormButtonArea from "@/components/ui/FieldFormButtonArea";
import Button from "@/components/ui/Button";

const MypageContent = () => {
  const navigate = useNavigate();
  const { setIsLogin } = UseLoginContext();

  const {
    getUserInfo: { data: userInfo }
  } = useUser();

  const [password, setPassword] = useState({
    current: "",
    new: ""
  });

  const handleEditUserInfo = () => {
    AuthService.changePassword(password.current, password.new) //
      .then((response) => {
        if (typeof response === "string") {
          alert(response);
          return;
        }
        alert("회원정보가 변경되었습니다.");
        navigate("/");
      });
  };

  const handleDeleteAccount = () => {
    const currentPassword = prompt("탈퇴를 하시겠습니까?\n회원탈퇴를 위해서는 비밀번호를 입력해주셔야 합니다.");

    if (currentPassword) {
      AuthService.deleteAccount(currentPassword) //
        .then((response) => {
          if (typeof response === "string") {
            alert(response);
            return;
          }
          setIsLogin(false);
          alert("탈퇴되었습니다. 이용해 주셔서 감사합니다.");
          navigate("/");
        });
    }
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="마이페이지" />
      <FieldFormBlock className="w-2/4">
        <FieldForm>
          <InputField label="이름" value={userInfo?.username || ""} name="username" type="text" disabled />
          <InputField label="이메일" value={userInfo?.email || ""} name="email" type="email" disabled />
          <InputField
            label="기존 비밀번호"
            name="currentPassword"
            type="password"
            setOnChange={(e) => {
              setPassword({ ...password, current: e.target.value });
            }}
          />
          <InputField
            label="새로운 비밀번호"
            name="newPassword"
            type="password"
            setOnChange={(e) => {
              setPassword({ ...password, new: e.target.value });
            }}
          />
        </FieldForm>
        <FieldFormButtonArea>
          <Button title="회원 탈퇴" variant="outline" size="large" onClick={handleDeleteAccount} />
          <Button title="회원정보 수정" variant="contain" size="full" onClick={handleEditUserInfo} />
        </FieldFormButtonArea>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default MypageContent;
