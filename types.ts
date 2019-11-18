export interface IRecipe {
  readonly _id: string;
  readonly _createdOn: string;
  readonly name: string;
  readonly description: string;
  readonly tags: Array<string>;
}
