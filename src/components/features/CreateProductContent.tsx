import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CloudinaryService from "@/services/CloudinaryService";
import AdminService from "@/services/AdminService";
import { ProductDomain } from "@/domain/ProductDomain";
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

  const [productInfo, setProductInfo] = useState<ProductDomain>({
    id: uuidv4(),
    image: "",
    title: "",
    price: "",
    description: "",
    category: "top",
    options: []
  });
  const { title, price, description, category, options } = productInfo;
  const [imageFile, setImageFile] = useState<File | null>();

  // 텍스트 필드
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
    setProductInfo({ ...productInfo, category: e.target.id });
  };

  // 옵션 필드
  const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      setProductInfo({ ...productInfo, options: [...productInfo.options, value] });
    } else if (!isChecked && options.includes(value)) {
      setProductInfo({ ...productInfo, options: options.filter((item) => item !== value) });
    }
  };

  // 상품 등록
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const createNewProduct = () => {
    for (const key in productInfo) {
      const value = productInfo[key];
      if (value === "" || value.length === 0) {
        alert("빈 칸을 모두 입력 해주세요.");
        return;
      }
    }
    setIsUploading(true);
    AdminService.setProduct(productInfo) //
      .then(() => {
        setTimeout(() => {
          setIsUploading(false);
          setSuccess(true);
        }, 1000);
        setTimeout(() => {
          setSuccess(false);
          navigate("/product-management");
        }, 3000);
      });
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="상품 등록" />

      <FieldFormBlock className="w-full">
        {success && (
          <div className="flex justify-center pb-9">
            <span className="text-base">
              <em className="not-italic text-[24px] align-top">😀</em> 상품이 성공적으로 등록되었습니다.
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
                checked={"top" === category ? true : false}
              />
              <Radio
                id="bottom"
                value="하의"
                name="category"
                onChange={handleCategories}
                checked={"bottom" === category ? true : false}
              />
              <Radio
                id="dress"
                value="원피스"
                name="category"
                onChange={handleCategories}
                checked={"dress" === category ? true : false}
              />
              <Radio
                id="shoes"
                value="신발"
                name="category"
                onChange={handleCategories}
                checked={"shoes" === category ? true : false}
              />
              <Radio
                id="bag"
                value="가방"
                name="category"
                onChange={handleCategories}
                checked={"bag" === category ? true : false}
              />
            </FormGroup>

            <FormGroup direction="row" label="옵션">
              <CheckBox
                id="XS"
                value="XS"
                name="option"
                onChange={handleOptions}
                checked={options.includes("XS") ? true : false}
              />
              <CheckBox
                id="S"
                value="S"
                name="option"
                onChange={handleOptions}
                checked={options.includes("S") ? true : false}
              />
              <CheckBox
                id="M"
                value="M"
                name="option"
                onChange={handleOptions}
                checked={options.includes("M") ? true : false}
              />
              <CheckBox
                id="L"
                value="L"
                name="option"
                onChange={handleOptions}
                checked={options.includes("L") ? true : false}
              />
              <CheckBox
                id="XL"
                value="XL"
                name="option"
                onChange={handleOptions}
                checked={options.includes("XL") ? true : false}
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
