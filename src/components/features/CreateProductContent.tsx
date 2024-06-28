import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudinaryService from "@/services/CloudinaryService";
import useProducts from "@/hooks/useProducts";
import { ProductOption, ProductValueDomain } from "@/domain/ProductDomain";
import { optionSizeList } from "@/common/productOption";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import FieldForm from "@/components/ui/FieldForm";
import FormGroup from "@/components/ui/FormGroup";
import FieldFormButtonArea from "@/components/ui/FieldFormButtonArea";
import InputField from "@/components/ui/InputField";
import TextareaField from "@/components/ui/TextareaField";
import Radio from "@/components/ui/Radio";
import CheckBox from "@/components/ui/CheckBox";
import Button from "@/components/ui/Button";

const CreateProductContent = () => {
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState<ProductValueDomain>({
    id: "",
    image: "",
    title: "",
    price: "",
    description: "",
    category: "상의",
    options: []
  });
  const { title, price, description, category, options } = productInfo;

  // 텍스트 필드
  const [imageFile, setImageFile] = useState<File | null>();
  const handleTextfields = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setImageFile(files[0]);
      CloudinaryService.uploadProductImg(files) //
        .then((url) => setProductInfo({ ...productInfo, [name]: url }));
      return;
    }
    setProductInfo({ ...productInfo, [name]: value });
  };

  // 카테고리 필드
  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductInfo({ ...productInfo, category: e.target.value });
  };

  // 옵션 필드
  const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    const isChecked = e.target.checked;
    const checkedOpt = optionSizeList.find((item) => item.opt === value) as ProductOption;

    if (isChecked) {
      setProductInfo({ ...productInfo, options: [...productInfo.options, checkedOpt] });
    } else if (!isChecked && options.some((option) => option.opt === value)) {
      setProductInfo({ ...productInfo, options: options.filter((option) => option.opt !== value) });
    }
  };

  // 상품 등록
  const { setProduct } = useProducts();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const createNewProduct = () => {
    for (const key in productInfo) {
      if (key === "id") continue;
      const value = productInfo[key];

      if (value === "" || value.length === 0) {
        alert("빈 칸을 모두 입력 해주세요.");
        return;
      }
    }

    setIsUploading(true);
    const optionsSort = productInfo.options.sort((a, b) => a.no - b.no);
    setProduct.mutate(
      { product: { ...productInfo, options: optionsSort } },
      {
        onSuccess: () => {
          setTimeout(() => {
            setIsUploading(false);
            setSuccess(true);
          }, 1000);
          setTimeout(() => {
            setSuccess(false);
            navigate("/product-management");
          }, 2000);
        }
      }
    );
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="상품 등록" />

      <FieldFormBlock className="w-full">
        {success && (
          <div className="flex justify-center pb-12">
            <span className="text-lg font-medium">
              <em className="not-italic text-[26px] align-top">😀</em> 상품이 성공적으로 등록되었습니다.
            </span>
          </div>
        )}

        <div className="flex gap-x-10 w-full">
          <FieldForm>
            <InputField type="file" label="상품 이미지" accept="image/*" name="image" onChange={handleTextfields} />
            <InputField type="text" label="상품명" value={title} name="title" onChange={handleTextfields} />
            <InputField type="number" label="가격" value={price} name="price" onChange={handleTextfields} />
            <TextareaField
              label="상품 설명"
              value={description}
              name="description"
              cols={10}
              rows={3}
              onChange={handleTextfields}
            />

            <FormGroup direction="row" label="카테고리">
              <Radio
                id="top"
                value="상의"
                name="category"
                onChange={handleCategories}
                checked={"상의" === category ? true : false}
              />
              <Radio
                id="bottom"
                value="하의"
                name="category"
                onChange={handleCategories}
                checked={"하의" === category ? true : false}
              />
              <Radio
                id="dress"
                value="원피스"
                name="category"
                onChange={handleCategories}
                checked={"원피스" === category ? true : false}
              />
              <Radio
                id="shoes"
                value="신발"
                name="category"
                onChange={handleCategories}
                checked={"신발" === category ? true : false}
              />
              <Radio
                id="bag"
                value="가방"
                name="category"
                onChange={handleCategories}
                checked={"가방" === category ? true : false}
              />
            </FormGroup>

            <FormGroup direction="row" label="옵션">
              <CheckBox
                id="XS"
                value="XS"
                name="option"
                onChange={handleOptions}
                checked={options.some((option) => option.opt === "XS")}
              />
              <CheckBox
                id="S"
                value="S"
                name="option"
                onChange={handleOptions}
                checked={options.some((option) => option.opt === "S")}
              />
              <CheckBox
                id="M"
                value="M"
                name="option"
                onChange={handleOptions}
                checked={options.some((option) => option.opt === "M")}
              />
              <CheckBox
                id="L"
                value="L"
                name="option"
                onChange={handleOptions}
                checked={options.some((option) => option.opt === "L")}
              />
              <CheckBox
                id="XL"
                value="XL"
                name="option"
                onChange={handleOptions}
                checked={options.some((option) => option.opt === "XL")}
              />
            </FormGroup>
          </FieldForm>

          {imageFile && (
            <div className="w-2/6 flex-none ">
              <img src={URL.createObjectURL(imageFile)} alt="상품 이미지" className="w-full h-auto" />
            </div>
          )}
        </div>

        <FieldFormButtonArea>
          <Button title="목록으로 돌아가기" variant="outline" size="large" href="/product-management" />
          <Button
            title={isUploading ? "상품 등록 중 ...." : "상품 등록"}
            variant="contain"
            size="full"
            onClick={createNewProduct}
          />
        </FieldFormButtonArea>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default CreateProductContent;
