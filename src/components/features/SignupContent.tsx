import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ContentBlockA from "@/components/ui/ContentBlockA";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import ContentBottomA from "@/components/ui/ContentBottomA";
import { useQuery } from "@tanstack/react-query";

const SignupContent = () => {
  const naviget = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = inputValue;

  const handleSignup = () => {
    if (inputValue.name === "") {
      alert("이름을 입력해주세요.");
      nameInput.current?.focus();
      return;
    }

    if (inputValue.email === "" || !checkValidateEmail) {
      alert("이메일을 정확하게 입력해주세요.");
      emailInput.current?.focus();
      return;
    } else if (checkDuplicateEmail) {
      alert("사용 불가능한 이메일입니다.");
      emailInput.current?.focus();
      return;
    } else if (checkDuplicateEmail === null) {
      alert("이메일 중복확인을 해주세요.");
      emailInput.current?.focus();
      return;
    }

    if (inputValue.password === "" || !checkValidatePassword) {
      alert("비밀번호를 정확하게 입력해주세요.");
      passwordInput.current?.focus();
      return;
    }

    AuthService.signup(name, email, password) //
      .then((response) => {
        if (typeof response === "string") {
          alert(response);
          return;
        }
        alert("회원가입이 성공하였습니다. 로그인 후 서비스를 이용하세요.");
        naviget("/login");
      });
  };

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: AuthService.getAllUsers
  });

  const [checkDuplicateEmail, setCheckDuplicateEmail] = useState<boolean | null>(null);
  const handleCheckDuplicateEmail = () => {
    if (!inputValue.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (allUsers) {
      const isDuplicateEmail = allUsers
        .filter((userInfo) => userInfo.email)
        .some((userInfo) => userInfo.email === inputValue.email);

      setCheckDuplicateEmail(isDuplicateEmail);
      isDuplicateEmail
        ? alert("중복된 이메일입니다. 이메일을 다시 입력해 주세요.")
        : alert("사용 가능한 이메일입니다.");
    }
  };

  const [checkValidateEmail, setCheckValidateEmail] = useState<boolean | null>(null);
  const handleValidateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    setCheckValidateEmail(emailRegex.test(target.value));
  };

  const [checkValidatePassword, setCheckValidatePassword] = useState<boolean | null>(null);
  const handlevalidatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;

    setCheckValidatePassword(passwordRegex.test(target.value));
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="회원가입" />
      <ContentBlockA className="w-2/4">
        <FieldForm>
          <div>
            <InputField
              label="이름"
              name="name"
              type="text"
              setOnChange={(e) => {
                setInputValue({ ...inputValue, name: e.target.value });
              }}
              ref={nameInput}
            />
          </div>

          <div>
            <div className="flex items-end gap-2">
              <InputField
                label="이메일"
                name="email"
                type="email"
                setOnChange={(e) => {
                  handleValidateEmail(e);
                  setCheckDuplicateEmail(null);
                  setInputValue({ ...inputValue, email: e.target.value });
                }}
                className="w-full"
                ref={emailInput}
              />
              <Button
                title="중복확인"
                variant="outline"
                size="small"
                className="px-3 py-[15px]"
                onClick={handleCheckDuplicateEmail}
              />
            </div>
            {checkValidateEmail === false && (
              <p className="pt-2 text-sm text-red-600">이메일 형식으로 입력해 주세요.</p>
            )}
          </div>

          <div>
            <InputField
              label="비밀번호"
              name="password"
              type="password"
              setOnChange={(e) => {
                handlevalidatePassword(e);
                setInputValue({ ...inputValue, password: e.target.value });
              }}
              ref={passwordInput}
            />
            {checkValidatePassword === false && (
              <p className="pt-2 text-sm text-red-600">숫자와 알벳을 사용하여 최소 8자에서 16자를 입력해 주세요.</p>
            )}
          </div>
        </FieldForm>

        <ContentBottomA>
          <Button title="회원가입" variant="contain" size="full" onClick={handleSignup} />
        </ContentBottomA>
      </ContentBlockA>
    </ContentLayoutA>
  );
};

export default SignupContent;
