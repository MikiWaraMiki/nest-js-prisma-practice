import * as util from 'util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

export const cleanupDatabase = async (): Promise<void> => {
  await exec('npx prisma migrate reset --force');
};

export const setupDatabase = async (): Promise<void> => {
  await exec('npx prisma migrate dev --preview-feature');
};
