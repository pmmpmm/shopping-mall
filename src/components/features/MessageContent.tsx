import { Link } from "react-router-dom";
import { BiMessageSquareError } from "react-icons/bi";
import { TbFaceIdError } from "react-icons/tb";
import LoadingIcon from "@/components/ui/LoadingIcon";

interface MessageProps {
  type: "loading" | "error" | "notFound";
  height?: string;
}
const MessageContent = ({ type, height }: MessageProps) => {
  let icon;
  let state;
  let text;
  switch (type) {
    case "loading":
      icon = <LoadingIcon />;
      state = `컨텐츠를 불러오고 있습니다.`;
      text = `잠시만 기다려주세요.`;
      break;
    case "error":
      icon = <BiMessageSquareError className="w-[96%] h-[96%] mt-2 ml-[-2px] text-base-100" />;
      state = `죄송합니다.<br/>컨텐츠 준비가 아직 안 되어있습니다.`;
      text = `빠른 시일 내에 다시 찾아뵙겠습니다.`;
      break;
    case "notFound":
      icon = <TbFaceIdError className="w-[96%] h-[96%] mt-2 ml-[-2px] text-base-100" />;
      state = `죄송합니다.<br/>페이지를 찾을 수 없습니다.`;
      text = `페이지의 이름이 변경되었거나 일시적으로 이용이 불가능합니다.`;
      break;
    default:
      icon = "";
      state = "기본";
      text = "기본";
  }
  return (
    <div className={`h-[60vh] relative ${height}`}>
      <div className="w-full text-center absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-[66%]">
        <div className={`flex justify-center items-center w-[5.5rem] h-[5.5rem] mx-auto`}>{icon}</div>

        <div className="textBox pt-6">
          <p
            className=" text-[18px] font-semibold leading-[1.40] text-base-100"
            dangerouslySetInnerHTML={{ __html: state }}
          ></p>
          <p className=" pt-3 text-sm text-[#888888]" dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>

        {type === "notFound" && (
          <div className="goToHome pt-4">
            <Link to="/" className="px-2 py-1 text-sm font-semibold bg-gray-900 text-white rounded dark:font-medium ">
              홈으로 이동
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContent;
