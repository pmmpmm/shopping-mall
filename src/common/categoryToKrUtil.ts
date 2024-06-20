export const categoryToKrUtil = (category: string) => {
  switch (category) {
    case "all":
      return "전체";
    case "top":
      return "상의";
    case "bottom":
      return "하의";
    case "dress":
      return "원피스";
    case "shoes":
      return "신발";
    case "bag":
      return "가방";
  }
};
