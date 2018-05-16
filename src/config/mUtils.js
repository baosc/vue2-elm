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
  if (!name) return null;
  return window.localStorage.getItem(name);
};
