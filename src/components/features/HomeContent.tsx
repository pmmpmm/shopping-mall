import useProducts from "@/hooks/useProducts";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ProductCard from "@/components/ui/ProductCard";

const HomeContent = () => {
  const {
    getAllProducts: { data: products }
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
        <ul className="grid grid-cols-4 gap-x-2 gap-y-14">
          {products?.map((product, idx) => (
            <li key={`product-${idx}`}>
              <ProductCard id={product.id} image={product.image} title={product.title} price={product.price} />
            </li>
          ))}
          <li></li>
        </ul>
      </ContentLayoutA>
    </>
  );
};

export default HomeContent;
