import moment from 'moment';

export const getTimeFromMoment = (date: string) =>
  moment(new Date(date)).format('DD/MM/YYYY');
