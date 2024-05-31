const instanceOf = (instance, classOrFunc) => {
  if (typeof instance !== 'object' || instance === null) return false;

  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto === classOrFunc.prototype) return true;
    proto = Object.getPrototypeOf(instance);
  }
  return false;
}