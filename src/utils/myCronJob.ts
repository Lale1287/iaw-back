import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {File} from '../models';
import {FileRepository} from '../repositories/file.repository';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(@repository(FileRepository) public fileRepository: FileRepository,) {
    super({
      name: 'job-B', onTick: async () => {
        let files: File[] = await fileRepository.find();
        console.log(new Date());
        console.log(files);
      },
      cronTime: '*/10 * * * * *',
      start: true,
    });
  }
}
