/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStoreItemInput = {
  id?: string | null,
  linkId: string,
  productName: string,
  pictures: Array< string | null >,
  price: number,
  currency: string,
  discountPrice?: number | null,
  hashtags: Array< string | null >,
  shortDescription?: string | null,
  description?: string | null,
  customizeTextInstructions?: string | null,
  sizes: Array< string | null >,
  colors: Array< string | null >,
  orientations: Array< string | null >,
  isPublished?: boolean | null,
};

export type ModelStoreItemConditionInput = {
  linkId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pictures?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  currency?: ModelStringInput | null,
  discountPrice?: ModelFloatInput | null,
  hashtags?: ModelStringInput | null,
  shortDescription?: ModelStringInput | null,
  description?: ModelStringInput | null,
  customizeTextInstructions?: ModelStringInput | null,
  sizes?: ModelStringInput | null,
  colors?: ModelStringInput | null,
  orientations?: ModelStringInput | null,
  isPublished?: ModelBooleanInput | null,
  and?: Array< ModelStoreItemConditionInput | null > | null,
  or?: Array< ModelStoreItemConditionInput | null > | null,
  not?: ModelStoreItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type StoreItem = {
  __typename: "StoreItem",
  id: string,
  linkId: string,
  productName: string,
  pictures: Array< string | null >,
  price: number,
  currency: string,
  discountPrice?: number | null,
  hashtags: Array< string | null >,
  shortDescription?: string | null,
  description?: string | null,
  customizeTextInstructions?: string | null,
  sizes: Array< string | null >,
  colors: Array< string | null >,
  orientations: Array< string | null >,
  isPublished?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateStoreItemInput = {
  id: string,
  linkId?: string | null,
  productName?: string | null,
  pictures?: Array< string | null > | null,
  price?: number | null,
  currency?: string | null,
  discountPrice?: number | null,
  hashtags?: Array< string | null > | null,
  shortDescription?: string | null,
  description?: string | null,
  customizeTextInstructions?: string | null,
  sizes?: Array< string | null > | null,
  colors?: Array< string | null > | null,
  orientations?: Array< string | null > | null,
  isPublished?: boolean | null,
};

export type DeleteStoreItemInput = {
  id: string,
};

export type ModelStoreItemFilterInput = {
  id?: ModelIDInput | null,
  linkId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pictures?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  currency?: ModelStringInput | null,
  discountPrice?: ModelFloatInput | null,
  hashtags?: ModelStringInput | null,
  shortDescription?: ModelStringInput | null,
  description?: ModelStringInput | null,
  customizeTextInstructions?: ModelStringInput | null,
  sizes?: ModelStringInput | null,
  colors?: ModelStringInput | null,
  orientations?: ModelStringInput | null,
  isPublished?: ModelBooleanInput | null,
  and?: Array< ModelStoreItemFilterInput | null > | null,
  or?: Array< ModelStoreItemFilterInput | null > | null,
  not?: ModelStoreItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStoreItemConnection = {
  __typename: "ModelStoreItemConnection",
  items?:  Array<StoreItem | null > | null,
  nextToken?: string | null,
};

export type CreateStoreItemMutationVariables = {
  input: CreateStoreItemInput,
  condition?: ModelStoreItemConditionInput | null,
};

export type CreateStoreItemMutation = {
  createStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStoreItemMutationVariables = {
  input: UpdateStoreItemInput,
  condition?: ModelStoreItemConditionInput | null,
};

export type UpdateStoreItemMutation = {
  updateStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStoreItemMutationVariables = {
  input: DeleteStoreItemInput,
  condition?: ModelStoreItemConditionInput | null,
};

export type DeleteStoreItemMutation = {
  deleteStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetStoreItemQueryVariables = {
  id: string,
};

export type GetStoreItemQuery = {
  getStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStoreItemsQueryVariables = {
  filter?: ModelStoreItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStoreItemsQuery = {
  listStoreItems?:  {
    __typename: "ModelStoreItemConnection",
    items?:  Array< {
      __typename: "StoreItem",
      id: string,
      linkId: string,
      productName: string,
      pictures: Array< string | null >,
      price: number,
      currency: string,
      discountPrice?: number | null,
      hashtags: Array< string | null >,
      shortDescription?: string | null,
      description?: string | null,
      customizeTextInstructions?: string | null,
      sizes: Array< string | null >,
      colors: Array< string | null >,
      orientations: Array< string | null >,
      isPublished?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStoreItemSubscription = {
  onCreateStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStoreItemSubscription = {
  onUpdateStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStoreItemSubscription = {
  onDeleteStoreItem?:  {
    __typename: "StoreItem",
    id: string,
    linkId: string,
    productName: string,
    pictures: Array< string | null >,
    price: number,
    currency: string,
    discountPrice?: number | null,
    hashtags: Array< string | null >,
    shortDescription?: string | null,
    description?: string | null,
    customizeTextInstructions?: string | null,
    sizes: Array< string | null >,
    colors: Array< string | null >,
    orientations: Array< string | null >,
    isPublished?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
