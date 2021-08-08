/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem($newItem: ItemInput) {
    createItem(newItem: $newItem) {
      itemId
      byLink
      title
      pictures
      description
      price
      currency
      discountPrice
      hashtags
      shortDescription
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
    }
  }
`;
export const createOder = /* GraphQL */ `
  mutation CreateOder($newOrder: OrderInput) {
    createOder(newOrder: $newOrder)
  }
`;
