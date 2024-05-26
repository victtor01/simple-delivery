interface ProductProps {
  params: {
    productId: string;
  };
}

const useProduct = () => {
    
}

export default function Product({ params }: ProductProps) {
  return <div>{params.productId}</div>;
}
