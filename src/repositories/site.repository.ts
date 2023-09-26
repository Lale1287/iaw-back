import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Site, SiteRelations, SubSite} from '../models';
import {SubSiteRepository} from './sub-site.repository';

export class SiteRepository extends DefaultCrudRepository<
  Site,
  typeof Site.prototype.id,
  SiteRelations
> {

  public readonly subSites: HasManyRepositoryFactory<SubSite, typeof Site.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SubSiteRepository') protected subSiteRepositoryGetter: Getter<SubSiteRepository>,
  ) {
    super(Site, dataSource);
    this.subSites = this.createHasManyRepositoryFactoryFor('subSites', subSiteRepositoryGetter,);
    this.registerInclusionResolver('subSites', this.subSites.inclusionResolver);
  }
}
