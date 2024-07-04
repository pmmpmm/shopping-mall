import useProducts from "@/hooks/useProducts";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import MessageContent from "@/components/features/MessageContent";
import ProductCard from "@/components/ui/ProductCard";
import NoContent from "@/components/ui/NoContent";

const HomeContent = () => {
  const {
    getAllProducts: { isLoading, isError, data: products }
  } = useProducts();

  return (
    <>
      <div className="flex items-center justify-center w-full h-[360px] overflow-hidden mt-5">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative z-20 text-white text-center">
            <p className="text-[40px] font-thin tracking-wider">BASIC STORY WITH US</p>
            <p className="text-lg font-thin tracking-wide">Best Products And High Quality</p>
          </div>
          <img
            src="https://res.cloudinary.com/dd1uetgqc/image/upload/v1718846953/marcus-loke-xXJ6utyoSw0-unsplash_uc4r9j.jpg"
            alt=""
            className="absolute -bottom-[33%] -left-[0.5%] z-10 w-[130%] h-auto max-w-[inherit] grayscale-[40%] brightness-[85%] blur-[2px] sepia-[15%]"
          />
        </div>
      </div>
      <ContentLayoutA>
        {isLoading && <MessageContent type="loading" height="h-[640px]" />}
        {isError && <MessageContent type="error" height="h-[640px]" />}

        {products && (
          <ul className="grid grid-cols-4 gap-x-2 gap-y-14">
            {products?.map((product, idx) => (
              <li key={`product-${idx}`}>
                <ProductCard id={product.id} image={product.image} title={product.title} price={product.price} />
              </li>
            ))}
          </ul>
        )}

        {products && products.length <= 0 && (
          <NoContent message="아직 상품이 준비되지 않았습니다. 빠른 시일 내에 준비하겠습니다." />
        )}
      </ContentLayoutA>
    </>
  );
};

export default HomeContent;
