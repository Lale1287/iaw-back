import {Entity, model, property} from '@loopback/repository';

@model()
export class SubSite extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'object',
  })
  content?: object;

  @property({
    type: 'string',
  })
  siteId?: string;

  constructor(data?: Partial<SubSite>) {
    super(data);
  }
}

export interface SubSiteRelations {
  // describe navigational properties here
}

export type SubSiteWithRelations = SubSite & SubSiteRelations;
