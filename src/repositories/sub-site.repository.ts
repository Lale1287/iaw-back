import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SubSite, SubSiteRelations} from '../models';

export class SubSiteRepository extends DefaultCrudRepository<
  SubSite,
  typeof SubSite.prototype.id,
  SubSiteRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(SubSite, dataSource);
  }
}
