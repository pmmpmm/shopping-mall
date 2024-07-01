import { ProductOption } from "@/domain/ProductDomain";

export const optionClothes = [
  { no: 0, opt: "XS" },
  { no: 1, opt: "S" },
  { no: 2, opt: "M" },
  { no: 3, opt: "L" },
  { no: 4, opt: "XL" }
];

export const optionShoes = [
  { no: 0, opt: "230" },
  { no: 1, opt: "235" },
  { no: 2, opt: "240" },
  { no: 3, opt: "245" },
  { no: 4, opt: "250" },
  { no: 5, opt: "255" },
  { no: 6, opt: "260" },
  { no: 7, opt: "265" }
];

export const optionList = (category: string) => {
  let optionSet: ProductOption[] = [];
  switch (category) {
    case "상의":
    case "하의":
    case "원피스":
      optionSet = optionClothes;
      return optionSet;
    case "신발":
      optionSet = optionShoes;
      return optionSet;
    default:
      return [];
  }
};

export const noOptionCategotys = ["가방", "목걸이"];
