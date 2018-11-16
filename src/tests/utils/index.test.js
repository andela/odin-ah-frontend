import { dateToString, reactionCountToString } from '../../utils/index';

test('Test Util.dateToString', () => {
  let date = '2018-11-14T10:57:19.230Z';
  let result = dateToString(date);
  expect(result).toEqual('Nov 14');

  date = '2017-11-14T10:57:19.230Z';
  result = dateToString(date);
  expect(result).toEqual('Nov 14, 17');
});
test('Test Util.reactionCountToString', () => {
  let date = null;
  let result = reactionCountToString(date);
  expect(result).toEqual('');

  date = 123356;
  result = reactionCountToString(date);
  expect(result).toEqual('123.4K');

  date = 56832034;
  result = reactionCountToString(date);
  expect(result).toEqual('56.8M');

  date = 999;
  result = reactionCountToString(date);
  expect(result).toEqual('999');
});
