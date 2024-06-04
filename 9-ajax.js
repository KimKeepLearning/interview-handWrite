// 原生实现
function ajax() {
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'https://google.com');
  xhr.onreadystatechange = () => {//每当 readyState 属性改变时，就会调用该函数。
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let string = xhr.responseText
        let object = JSON.parse(string);
        console.log(object)
      }
    }
  }
  xhr.send();
}

// promise实现
function ajaxPromise(url, method) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject('err');
        }
      }
    }
    xhr.send();
  })
}