const concurrencyRequest = (urls, maxNum) => {
  return new Promise((resolve) => {
    if (!urls.length) {
      resolve([]);
      return;
    }
    const results = [];
    let current = 0; // 下一个请求的下标
    let completed = 0; // 当前请求完成的数量
    let total = urls.length;
    // 发送请求
    const request = () => {
      const progress = current;
      current++;
      if (progress >= total) {
        return;
      }
      fetch(urls[progress]).then(res => {
        results[progress] = res;
      }).catch(e => {
        results[progress] = e;
      }).finally(() => {
        completed++;
        if (completed >= total) {
          resolve(results);
          return;
        }
        request();
      })
    }

    const times = Math.min(maxNum, urls.length);
    // 开启第一次批量调用
    while(current < times) {
      request();
    }
  })
}
