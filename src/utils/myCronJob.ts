import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Site} from '../models';
import {SiteRepository} from '../repositories';
import {processSite} from './cheerioHelper';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(@repository(SiteRepository) public siteRepository: SiteRepository,) {
    super({
      name: 'job-B', onTick: async () => {
        let sites: Site[] = await siteRepository.find();
        console.log(new Date());
        sites.forEach(async s => {
          console.log(s);
          const result = await processSite(s);
          console.log('Datos extraidos', result);
        });
      },
      cronTime: '*/10 * * * * *',
      start: true,
    });
  }
}
