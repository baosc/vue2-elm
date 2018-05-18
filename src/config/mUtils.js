/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  let ct = content;
  if (typeof content !== 'string') {
    ct = JSON.stringify(ct);
  }
  window.localStorage.setItem(name, ct);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return '';
  return window.localStorage.getItem(name);
};

export const removeStore = (name) => {
  if (!name) return false;
  return window.localStorage.removeItem(name);
};
