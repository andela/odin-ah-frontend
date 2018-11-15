import moment from 'moment';

export const toSentenceCase = word => word.charAt(0)
  .toUpperCase() + word.slice(1);


export const dateToString = (date) => {
  const currentYear = moment()
    .format('YYYY');
  const time = moment(date);
  const yearPublished = time.format('YYYY');
  return currentYear === yearPublished ? time.format('MMM D') : time.format('MMM D, YY');
};

export const reactionCountToString = (count) => {
  if (!count) {
    return '';
  }
  if (count >= 1e6 - 1) {
    return `${(count / 1e6).toFixed(1)}M`;
  }
  if (count >= 1e3) {
    return `${(count / 1e3).toFixed(1)}K`;
  }
  return `${count}`;
};
