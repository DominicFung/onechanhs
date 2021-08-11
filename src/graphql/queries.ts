/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStoreItemById = /* GraphQL */ `
  query GetStoreItemById($itemId: ID!) {
    getStoreItemById(itemId: $itemId) {
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
export const getStoreItemWithPic = /* GraphQL */ `
  query GetStoreItemWithPic($itemId: ID!) {
    getStoreItemWithPic(itemId: $itemId) {
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
export const getStoreItemByTitle = /* GraphQL */ `
  query GetStoreItemByTitle($title: String!) {
    getStoreItemByTitle(title: $title) {
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
export const listItems = /* GraphQL */ `
  query ListItems($limit: Int!, $nextToken: String) {
    listItems(limit: $limit, nextToken: $nextToken) {
      storeItems {
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
      nextToken
    }
  }
`;
export const getHDImage = /* GraphQL */ `
  query GetHDImage($key: String) {
    getHDImage(key: $key) {
      url
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($orderId: String!) {
    getOrder(orderId: $orderId) {
      orderId
      address
      postalCode
      city
      state
      country
      orderItems {
        orderItemId
        purchasePrice
        text
        size
        color
        orientation
        additionalInstructions
      }
      discount
      discountCodeUsed
      isFulfilled
      fulfilledDate
      dateOrdered
    }
  }
`;
