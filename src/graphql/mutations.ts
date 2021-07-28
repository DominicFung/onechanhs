/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStoreItem = /* GraphQL */ `
  mutation CreateStoreItem(
    $input: CreateStoreItemInput!
    $condition: ModelStoreItemConditionInput
  ) {
    createStoreItem(input: $input, condition: $condition) {
      id
      linkId
      productName
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      description
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
      createdAt
      updatedAt
    }
  }
`;
export const updateStoreItem = /* GraphQL */ `
  mutation UpdateStoreItem(
    $input: UpdateStoreItemInput!
    $condition: ModelStoreItemConditionInput
  ) {
    updateStoreItem(input: $input, condition: $condition) {
      id
      linkId
      productName
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      description
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
      createdAt
      updatedAt
    }
  }
`;
export const deleteStoreItem = /* GraphQL */ `
  mutation DeleteStoreItem(
    $input: DeleteStoreItemInput!
    $condition: ModelStoreItemConditionInput
  ) {
    deleteStoreItem(input: $input, condition: $condition) {
      id
      linkId
      productName
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      description
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
      createdAt
      updatedAt
    }
  }
`;
