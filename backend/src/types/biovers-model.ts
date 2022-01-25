export interface BioversModel {
  id?: number;
  name: string;
  owner: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  is_public?: boolean;
}

export interface BioversModels extends Array<BioversModel> {}
