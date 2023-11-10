export const EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

export const USERNAME = /^[a-zA-Z]([a-zA-Z0-9_]+)?$/;

export const PASSWORD = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~].*).{6,18}$/;

