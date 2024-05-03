export const generate = ({
  tag,
  props,
  textContent
}: {
  tag:string
  props: Record<string, string>
  textContent: string
}): string => {
  const propsStr = Object.entries(props).map(([k, v]) => `${k}: "${v}"`).join(', ');

  return `return () => {
    const { h } = Chibivue;
    return h("${tag}", {${propsStr}}, ["${textContent}"]);
  }
  `
}
