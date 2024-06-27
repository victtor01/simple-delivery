import { ProductTopic } from "@/entities/product-topic";

interface ProductTopicsProps {
  productTopic: ProductTopic;
}

const ProductsTopics = (props: ProductTopicsProps) => {
  const { productTopic } = props;

  console.log(productTopic)

  return (
    <div
      className="text-gray-500 flex flex-col
    text-lg"
    key={productTopic.id}
    >
      {productTopic?.name}
      <div className="w-auto ml-4">
        {productTopic?.topicOptions?.map((option) => {
          return (
            <div
            key={option.id}
            className="flex gap-2 items-center">
              <button className="w-4 h-4 rounded border bg-white" />
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProductsTopics };
