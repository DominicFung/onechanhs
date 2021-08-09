/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ItemInput = {
  title: string,
  description?: string | null,
  price: number,
};

export type StoreItem = {
  __typename: "StoreItem",
  itemId: string,
  byLink: string,
  title: string,
  description?: string | null,
  focusPictureUrl?: string | null,
  pictures: Array< string | null >,
  price: number,
  currency: string,
  discountPrice?: number | null,
  hashtags: Array< string | null >,
  shortDescription?: string | null,
  customizeTextInstructions?: string | null,
  sizes: Array< string | null >,
  colors: Array< string | null >,
  orientations: Array< string | null >,
  isPublished?: boolean | null,
};

export type OrderInput = {
  items?: Array< OrderItemInput | null > | null,
  address: string,
  postalCode: string,
  city: string,
  state?: string | null,
  country: string,
};

export type OrderItemInput = {
  itemId: string,
  text?: string | null,
  size?: string | null,
  color?: string | null,
  orientation?: string | null,
  additionalInstructions?: string | null,
};

export type OrderOutput = {
  __typename: "OrderOutput",
  orderId: string,
  address: string,
  postalCode: string,
  city: string,
  state?: string | null,
  country: string,
};

export type StorePage = {
  __typename: "StorePage",
  storeItems?:  Array<StoreItem | null > | null,
  nextToken?: string | null,
};

export type Order = {
  __typename: "Order",
  orderId: string,
  address: string,
  postalCode: string,
  city: string,
  state?: string | null,
  country: string,
  discount?: number | null,
  discountCodeUsed?: string | null,
  isFulfilled?: boolean | null,
  fulfilledDate?: string | null,
  dateOrdered?: string | null,
};

export type CreateItemMutationVariables = {
  newItem?: ItemInput | null,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "StoreItem",
    itemId: string,
    byLink: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
  },
};

export type CreateOrderMutationVariables = {
  newOrder?: OrderInput | null,
};

export type CreateOrderMutation = {
  createOrder:  {
    __typename: "OrderOutput",
    orderId: string,
    address: string,
    postalCode: string,
    city: string,
    state?: string | null,
    country: string,
  },
};

export type GetStoreItemByIdQueryVariables = {
  itemId: string,
};

export type GetStoreItemByIdQuery = {
  getStoreItemById:  {
    __typename: "StoreItem",
    itemId: string,
    byLink: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
  },
};

export type GetStoreItemWithPicQueryVariables = {
  itemId: string,
};

export type GetStoreItemWithPicQuery = {
  getStoreItemWithPic:  {
    __typename: "StoreItem",
    itemId: string,
    byLink: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
  },
};

export type GetStoreItemByTitleQueryVariables = {
  title: string,
};

export type GetStoreItemByTitleQuery = {
  getStoreItemByTitle:  {
    __typename: "StoreItem",
    itemId: string,
    byLink: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
  },
};

export type ListItemsQueryVariables = {
  limit: number,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems:  {
    __typename: "StorePage",
    storeItems?:  Array< {
      __typename: "StoreItem",
      itemId: string,
      byLink: string,
      title: string,
      description?: string | null,
      focusPictureUrl?: string | null,
      pictures: Array< string | null >,
      price: number,
      currency: string,
      discountPrice?: number | null,
      hashtags: Array< string | null >,
      shortDescription?: string | null,
      customizeTextInstructions?: string | null,
      sizes: Array< string | null >,
      colors: Array< string | null >,
      orientations: Array< string | null >,
      isPublished?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  },
};

export type GetOrderQueryVariables = {
  orderId: string,
};

export type GetOrderQuery = {
  getOrder:  {
    __typename: "Order",
    orderId: string,
    address: string,
    postalCode: string,
    city: string,
    state?: string | null,
    country: string,
    discount?: number | null,
    discountCodeUsed?: string | null,
    isFulfilled?: boolean | null,
    fulfilledDate?: string | null,
    dateOrdered?: string | null,
  },
};
