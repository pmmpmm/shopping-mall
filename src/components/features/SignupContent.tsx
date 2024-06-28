import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ContentBlockA from "@/components/ui/ContentBlockA";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import ContentBottomA from "@/components/ui/ContentBottomA";

const SignupContent = () => {
  const naviget = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = inputValue;

  const handleSignup = () => {
    AuthService.signup(name, email, password) //
      .then((response) => {
        if (typeof response === "string") {
          alert(response);
          return;
        }
        alert("회원가입이 성공하였습니다.");
        naviget("/login");
      });
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="회원가입" />
      <ContentBlockA className="w-2/4">
        <FieldForm>
          <InputField
            label="이름"
            name="name"
            type="text"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, name: e.target.value });
            }}
          />
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

        <ContentBottomA>
          <Button title="회원가입" variant="contain" size="full" onClick={handleSignup} />
        </ContentBottomA>
      </ContentBlockA>
    </ContentLayoutA>
  );
};

export default SignupContent;
