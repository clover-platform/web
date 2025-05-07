// 转义HTML
export const htmlEscape = (html: string) => {
  return html.replace('&nbsp;', '').replace(/[<>"&]/g, function (match) {
    switch (match) {
    case "<":
      return "&lt;";
    case ">":
      return "&gt;"
    case "&":
      return "&amp;";
    case "\"":
      return "&quot;";
    default:
      return match;
    }
  });
};
