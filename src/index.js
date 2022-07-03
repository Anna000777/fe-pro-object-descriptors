/**
 * Принимает в себя два аргумента, один из них принимает объект, второй строку с названием
 * дескриптора. Должно вернуть массив строк, которыми являются ключи объекта соответствующие
 * дескриптору. То есть если у нас есть два свойства у которых writable true(если мы передали арг
 * writable) то возвращает массив со строками-названиями этих свойств. Смотрите пример в check.js
 * @param {Object} object
 * @param {'writable' | 'enumerable' | 'configurable'} descriptor
 *
 * @returns string[]
 */
export const getKeysByDescriptor = (object, descriptor) => {
  const descriptors = Object.getOwnPropertyDescriptors(object);
  const keys = Object.entries(descriptors)
    .filter((item) => item[1][descriptor] === true)
    .map((item) => item[0]);
  return keys;
};

/**
 * Должен вернуть true если объект был заморожен каким-либо методом заморозки freeze, seal, preventExtensions иначе false
 * @param {Object} object
 * @returns {boolean}
 */
export const isObjectAnyFrozen = (object) => {
  const frozen = Object.isFrozen(object);
  const seal = Object.isSealed(object);
  const extensible = Object.isExtensible(object);
  if (frozen || seal || !extensible) {
    return true;
  }
  return false;
};

/**
 * Принимает объект и строку. Мы должны вернуть НОВЫЙ объект(копию оригинального), в котором
 * название свойства (мы передали вторым аргументом), будет поставлено во writable false(только
 * нельзя перезаписывать, все остальное можно). Если свойство было в объекте, то мы ставим его значение
 * если не было ставим в значение null
 * @param {Object} object
 * @param {string} propertyName
 *
 * @returns {Object}
 */
export const assignLockedValues = (object, propertyName) => {
  const newObj = Object.create(
    Object.getPrototypeOf(object),
    Object.getOwnPropertyDescriptors(object)
  );
  if (!Object.keys(newObj).includes(propertyName)) {
    Object.defineProperty(newObj, propertyName, {
      value: null,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  } else {
    Object.defineProperty(newObj, propertyName, {
      value: object[propertyName],
      writable: false,
      enumerable: true,
      configurable: true,
    });
  }
  return newObj;
};

/**
 * Принимает объект и возвращает его копию, только абсолютно замороженную
 * Нельзя удалять свойства, добавлять и редактировать
 * @param {Object} object
 * @returns {Object}
 */
export const freezeAllInObject = (object) => {
  const copiedObj = Object.create(
    Object.getPrototypeOf(object),
    Object.getOwnPropertyDescriptors(object)
  );
  // console.log(copiedObj);
  // console.log(copiedObj === object);
  //console.log(Object.getOwnPropertyDescriptors(object));

  return Object.freeze(copiedObj);
};
