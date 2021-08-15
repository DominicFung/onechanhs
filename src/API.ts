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
  linkId: string,
  title: string,
  description?: string | null,
  focusPictureUrl?: string | null,
  pictures?: Array< string | null > | null,
  picKeys?: Array< string | null > | null,
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
  email: string,
  address?: string | null,
  postalCode?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
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
  email: string,
  orderItems?:  Array<OrderItemOutput | null > | null,
  totalPrice: number,
};

export type OrderItemOutput = {
  __typename: "OrderItemOutput",
  itemId: string,
  purchasePrice: number,
  text?: string | null,
  size?: string | null,
  color?: string | null,
  orientation?: string | null,
  additionalInstructions?: string | null,
};

export type StorePage = {
  __typename: "StorePage",
  storeItems?:  Array<StoreItem | null > | null,
  nextToken?: string | null,
};

export type HdImageURL = {
  __typename: "HdImageURL",
  url?: string | null,
};

export type Order = {
  __typename: "Order",
  orderId: string,
  email: string,
  address?: string | null,
  postalCode?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  orderItems?:  Array<OrderItem | null > | null,
  discount?: number | null,
  discountCodeUsed?: string | null,
  isFulfilled?: boolean | null,
  fulfilledDate?: string | null,
  dateOrdered?: string | null,
};

export type OrderItem = {
  __typename: "OrderItem",
  orderItemId: string,
  itemId: string,
  purchasePrice: number,
  text?: string | null,
  size?: string | null,
  color?: string | null,
  orientation?: string | null,
  additionalInstructions?: string | null,
};

export type CreateItemMutationVariables = {
  newItem?: ItemInput | null,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "StoreItem",
    itemId: string,
    linkId: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures?: Array< string | null > | null,
    picKeys?: Array< string | null > | null,
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

export type CreateItemFullMutationVariables = {
  newItem?: ItemInput | null,
};

export type CreateItemFullMutation = {
  createItemFull:  {
    __typename: "StoreItem",
    itemId: string,
    linkId: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures?: Array< string | null > | null,
    picKeys?: Array< string | null > | null,
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
    email: string,
    orderItems?:  Array< {
      __typename: "OrderItemOutput",
      itemId: string,
      purchasePrice: number,
      text?: string | null,
      size?: string | null,
      color?: string | null,
      orientation?: string | null,
      additionalInstructions?: string | null,
    } | null > | null,
    totalPrice: number,
  },
};

export type GetStoreItemByIdQueryVariables = {
  itemId: string,
};

export type GetStoreItemByIdQuery = {
  getStoreItemById:  {
    __typename: "StoreItem",
    itemId: string,
    linkId: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures?: Array< string | null > | null,
    picKeys?: Array< string | null > | null,
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
    linkId: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures?: Array< string | null > | null,
    picKeys?: Array< string | null > | null,
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
    linkId: string,
    title: string,
    description?: string | null,
    focusPictureUrl?: string | null,
    pictures?: Array< string | null > | null,
    picKeys?: Array< string | null > | null,
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
      linkId: string,
      title: string,
      description?: string | null,
      focusPictureUrl?: string | null,
      pictures?: Array< string | null > | null,
      picKeys?: Array< string | null > | null,
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

export type GetHDImageQueryVariables = {
  key?: string | null,
};

export type GetHDImageQuery = {
  getHDImage?:  {
    __typename: "HdImageURL",
    url?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  orderId: string,
};

export type GetOrderQuery = {
  getOrder:  {
    __typename: "Order",
    orderId: string,
    email: string,
    address?: string | null,
    postalCode?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    orderItems?:  Array< {
      __typename: "OrderItem",
      orderItemId: string,
      itemId: string,
      purchasePrice: number,
      text?: string | null,
      size?: string | null,
      color?: string | null,
      orientation?: string | null,
      additionalInstructions?: string | null,
    } | null > | null,
    discount?: number | null,
    discountCodeUsed?: string | null,
    isFulfilled?: boolean | null,
    fulfilledDate?: string | null,
    dateOrdered?: string | null,
  },
};
