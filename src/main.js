class JSLoader {
  static loadJS(path, cb, async) {
    const script = document.createElement('script');

    script.classList.add('js-loader');
    script.src = path;
    script.async = !!async;

    if (typeof cb === 'function') {
      script.onload = cb;
    }

    document.head.appendChild(script);
  };

  static loadJSs(paths) {
    paths.forEach(pathObject => {
      that.loadJS(pathObject.path, pathObject.cb, pathObject.async);
    });
  }
}

export default JSLoader;