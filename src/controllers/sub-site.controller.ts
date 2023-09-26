import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SubSite} from '../models';
import {SubSiteRepository} from '../repositories';

export class SubSiteController {
  constructor(
    @repository(SubSiteRepository)
    public subSiteRepository : SubSiteRepository,
  ) {}

  @post('/sub-sites')
  @response(200, {
    description: 'SubSite model instance',
    content: {'application/json': {schema: getModelSchemaRef(SubSite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubSite, {
            title: 'NewSubSite',
            exclude: ['id'],
          }),
        },
      },
    })
    subSite: Omit<SubSite, 'id'>,
  ): Promise<SubSite> {
    return this.subSiteRepository.create(subSite);
  }

  @get('/sub-sites/count')
  @response(200, {
    description: 'SubSite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SubSite) where?: Where<SubSite>,
  ): Promise<Count> {
    return this.subSiteRepository.count(where);
  }

  @get('/sub-sites')
  @response(200, {
    description: 'Array of SubSite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SubSite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SubSite) filter?: Filter<SubSite>,
  ): Promise<SubSite[]> {
    return this.subSiteRepository.find(filter);
  }

  @patch('/sub-sites')
  @response(200, {
    description: 'SubSite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubSite, {partial: true}),
        },
      },
    })
    subSite: SubSite,
    @param.where(SubSite) where?: Where<SubSite>,
  ): Promise<Count> {
    return this.subSiteRepository.updateAll(subSite, where);
  }

  @get('/sub-sites/{id}')
  @response(200, {
    description: 'SubSite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SubSite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SubSite, {exclude: 'where'}) filter?: FilterExcludingWhere<SubSite>
  ): Promise<SubSite> {
    return this.subSiteRepository.findById(id, filter);
  }

  @patch('/sub-sites/{id}')
  @response(204, {
    description: 'SubSite PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubSite, {partial: true}),
        },
      },
    })
    subSite: SubSite,
  ): Promise<void> {
    await this.subSiteRepository.updateById(id, subSite);
  }

  @put('/sub-sites/{id}')
  @response(204, {
    description: 'SubSite PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subSite: SubSite,
  ): Promise<void> {
    await this.subSiteRepository.replaceById(id, subSite);
  }

  @del('/sub-sites/{id}')
  @response(204, {
    description: 'SubSite DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subSiteRepository.deleteById(id);
  }
}
