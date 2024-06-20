import { NEXT_PUBLIC_BACKEND_URL } from "@/config/constants"

function getImageProduct (imageUrl: string | null | undefined) {
  const IMAGE_URL = NEXT_PUBLIC_BACKEND_URL

  const imagePreview = imageUrl ? 
  `${IMAGE_URL}/uploads/products/${imageUrl}` : null

  return imagePreview;
}

export { getImageProduct }