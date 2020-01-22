export function parse(fileBuffer: string): [Map<string, string>, [string?]] {
  const parsed = new Map<string, string>();
  const emptyKeys: [string?] = [];

  fileBuffer
    .toString()
    .split('\n')
    .forEach(function(line: String) {
      const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (keyValueArr != null) {
        const key = keyValueArr[1];

        let value = keyValueArr[2] || '';
        const len = value ? value.length : 0;
        if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
          value = value.replace(/\\n/gm, '\n');
        }
        value = value.replace(/(^['"]|['"]$)/g, '').trim();
        if (!value.length) {
          emptyKeys.push(key);
        }
        parsed.set(key, value.length ? value : null);
      }
    });

  return [parsed, emptyKeys];
}
