/*
  Json 오브젝트에 있는 값을 일일히 기입하며 컴포넌트를 구성하는 대신
  내용물을 Parsing하여 공통된 함수에 적용하는 함수
*/

/*
  오브젝트 평탄화 함수
*/
const flattenObject = (obj, previousKey) => {
  const flattened = {};

  Object.keys(obj).forEach((currentKey) => {
    const value = obj[currentKey];

    // 순수하게 json 형태로만 구성된 오브젝트에 한해 재귀를 실행한다
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
      Object.assign(flattened, flattenObject(value, currentKey));
    } else {
      const _previousKey = previousKey || '';
      const _currentKey = previousKey ? currentKey.charAt(0).toUpperCase() + currentKey.slice(1) : currentKey;

      flattened[`${_previousKey}${_currentKey}`] = value;
    }
  });

  return flattened;
};

function parseObject (object, callback) {
  const tempArray = [];

  const flatten = flattenObject(object);

  for (const [key, value] of Object.entries(flatten)) {
    // 영문에 한해 key 값의 첫 문자를 대문자로 변환하고, camelCase 앞에는 여백을 줌
    const capitalLetter = /[A-Z]/g;
    const _key = key.charAt(0).toUpperCase() + key.replace(capitalLetter, ' $&').slice(1);

    tempArray.push(callback.call(this, _key, value));
  }

  return tempArray;
}

export default parseObject;
