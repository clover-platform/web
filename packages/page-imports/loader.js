// eslint-disable-next-line import/no-anonymous-default-export
export default function (source) {
  const { imports = [] } = (this.getOptions() || {});
  const code = imports.map((item) => `import '${item}';`).join('\n');
  return code + "\n" + source;
}
