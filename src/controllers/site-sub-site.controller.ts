import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Site,
  SubSite,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteSubSiteController {
  constructor(
    @repository(SiteRepository) protected siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/sub-sites', {
    responses: {
      '200': {
        description: 'Array of Site has many SubSite',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SubSite)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SubSite>,
  ): Promise<SubSite[]> {
    return this.siteRepository.subSites(id).find(filter);
  }

  @post('/sites/{id}/sub-sites', {
    responses: {
      '200': {
        description: 'Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubSite)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubSite, {
            title: 'NewSubSiteInSite',
            exclude: ['id'],
            optional: ['siteId']
          }),
        },
      },
    }) subSite: Omit<SubSite, 'id'>,
  ): Promise<SubSite> {
    return this.siteRepository.subSites(id).create(subSite);
  }

  @patch('/sites/{id}/sub-sites', {
    responses: {
      '200': {
        description: 'Site.SubSite PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubSite, {partial: true}),
        },
      },
    })
    subSite: Partial<SubSite>,
    @param.query.object('where', getWhereSchemaFor(SubSite)) where?: Where<SubSite>,
  ): Promise<Count> {
    return this.siteRepository.subSites(id).patch(subSite, where);
  }

  @del('/sites/{id}/sub-sites', {
    responses: {
      '200': {
        description: 'Site.SubSite DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SubSite)) where?: Where<SubSite>,
  ): Promise<Count> {
    return this.siteRepository.subSites(id).delete(where);
  }
}
