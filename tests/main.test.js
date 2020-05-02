import JSLoader from '../src/main';

describe('JSLoader', () => {
  let script;
  const path = 'path/script.js';

  beforeAll(() => {
    Object.defineProperty(global.document.head, 'appendChild', {
      value: jest.fn(),
    });
  });

  beforeEach(() => {
    script = {
      classList: {
        add: jest.fn(),
      },
    };
    jest.spyOn(global.document, 'createElement').mockReturnValue(script);
    
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('method/loadJS', () => {
    it('should append script to head', () => {  
      JSLoader.loadJS(path);

      expect(script.onload).toBe(undefined);
      expect(script.src).toBe(path);
      expect(script.async).toBe(false);
      expect(script.classList.add).toBeCalledWith('js-loader');
      expect(document.createElement).toBeCalledWith('script');
      expect(document.head.appendChild).toBeCalledWith(script);
    });


    it('should set callback function to onload event if cb is given as a parameter', () => {
      const cb = jest.fn();

      JSLoader.loadJS(path, cb, true);

      expect(script.onload).toBe(cb);
      expect(script.src).toBe(path);
      expect(script.async).toBe(true);
      expect(script.classList.add).toBeCalledWith('js-loader');
      expect(document.createElement).toBeCalledWith('script');
      expect(document.head.appendChild).toBeCalledWith(script);
    });
  });

  describe('method/loadJSs', () => {
    beforeAll(() => {
      JSLoader.loadJS = jest.fn();
    });

    it('should call loadJS method with given params', () => {
      const paths = [
        {
          path: 'path/script-1.js',
          cb: jest.fn(),
          async: true,
        },
        {
          path: 'path/script-2.js'
        }
      ];

      JSLoader.loadJSs(paths);

      paths.forEach((pathObject) => {
        expect(JSLoader.loadJS).toBeCalledWith(pathObject.path, pathObject.cb, pathObject.async);
      });
    });
  });
});