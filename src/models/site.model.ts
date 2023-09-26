import {Entity, model, property, hasMany} from '@loopback/repository';
import {SubSite} from './sub-site.model';

@model()
export class Site extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'number',
    required: true,
  })
  max_depth: number;

  @property({
    type: 'string',
    required: true,
  })
  frequency: string;

  @property({
    type: 'string',
  })
  document_extractor?: string;

  @hasMany(() => SubSite)
  subSites: SubSite[];

  constructor(data?: Partial<Site>) {
    super(data);
  }
}

export interface SiteRelations {
  // describe navigational properties here
}

export type SiteWithRelations = Site & SiteRelations;
