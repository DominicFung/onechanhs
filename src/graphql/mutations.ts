/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem($newItem: ItemInput) {
    createItem(newItem: $newItem) {
      itemId
      linkId
      title
      description
      focusPictureUrl
      pictures
      picKeys
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
export const createItemFull = /* GraphQL */ `
  mutation CreateItemFull($newItem: ItemInput) {
    createItemFull(newItem: $newItem) {
      itemId
      linkId
      title
      description
      focusPictureUrl
      pictures
      picKeys
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
