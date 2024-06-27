
function getImageProduct (imageUrl: string | null | undefined) {
  const IMAGE_URL = 'http://localhost:9000'

  const imagePreview = imageUrl ? 
  `${IMAGE_URL}/uploads/products/${imageUrl}` : null

  return imagePreview;
}

export { getImageProduct }