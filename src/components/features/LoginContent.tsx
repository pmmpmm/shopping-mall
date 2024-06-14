import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "@/context/LoginContext";
import AuthService from "@/services/AuthService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import FieldFormButtonArea from "@/components/ui/FieldFormButtonArea";
import Button from "@/components/ui/Button";

const LoginContent = () => {
  const { setIsLogin } = UseLoginContext();
  const naviget = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });
  const { email, password } = inputValue;

  const handleLogin = () => {
    AuthService.login(email, password) //
      .then((response) => {
        if (typeof response === "string") {
          alert(response);
          return;
        }
        setIsLogin(true);
        naviget("/");
      });
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="로그인" />
      <FieldFormBlock className="w-2/4">
        <FieldForm>
          <InputField
            label="이메일"
            name="email"
            type="email"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, email: e.target.value });
            }}
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, password: e.target.value });
            }}
          />
        </FieldForm>
        <FieldFormButtonArea>
          <Button title="회원가입" variant="outline" size="full" href="/signup" />
          <Button title="로그인" variant="contain" size="full" onClick={handleLogin} />
        </FieldFormButtonArea>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default LoginContent;
