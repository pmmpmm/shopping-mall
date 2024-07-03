import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "@/context/LoginContext";
import AuthService from "@/services/AuthService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ContentBlockA from "@/components/ui/ContentBlockA";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import ContentBottomA from "@/components/ui/ContentBottomA";
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
    if (inputValue.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (inputValue.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="로그인" />
      <ContentBlockA className="w-2/4">
        <FieldForm>
          <InputField
            label="이메일"
            name="email"
            type="email"
            onKeyDown={handleKeyPress}
            setOnChange={(e) => {
              setInputValue({ ...inputValue, email: e.target.value });
            }}
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            onKeyDown={handleKeyPress}
            setOnChange={(e) => {
              setInputValue({ ...inputValue, password: e.target.value });
            }}
          />
        </FieldForm>
        <ContentBottomA>
          <Button title="회원가입" variant="outline" size="full" href="/signup" />
          <Button title="로그인" variant="contain" size="full" onClick={handleLogin} />
        </ContentBottomA>
      </ContentBlockA>
    </ContentLayoutA>
  );
};

export default LoginContent;
