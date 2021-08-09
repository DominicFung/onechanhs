/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem($newItem: ItemInput) {
    createItem(newItem: $newItem) {
      itemId
      byLink
      title
      description
      focusPictureUrl
      pictures
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($newOrder: OrderInput) {
    createOrder(newOrder: $newOrder) {
      orderId
      address
      postalCode
      city
      state
      country
    }
  }
`;
