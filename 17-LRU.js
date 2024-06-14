class LRUCache {
  constructor(length) {
    this.size = length;
    this.data = new Map();
  }

  set(key, value) {
    const { size, data } = this;
    if (data.has(key)) {
      data.delete(key)
    }
    data.set(key, value);
    if (data.size > size) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const { data } = this;
    if (!data.has(key)) {
      return null;
    }
    const val = data.get(key);
    data.delete(key);
    data.set(key, val);
    return val;
  }
}