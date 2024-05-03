import {TemplateChildrenNode, NodeTypes, ElementNode, TextNode } from './ast'

export const generate = ({
  children,
}:{children: TemplateChildrenNode[]}):string => {
  return `return function render(){
      const { h } = Chibivue;
      return ${genNode(children[0])};
    }
  `
}

const genNode = (node: TemplateChildrenNode): string => {
  switch(node.type){
    case NodeTypes.ELEMENT:
      return genElement(node)
    case NodeTypes.TEXT:
      return genText(node)
    default:
      return ''
  }
}

const genElement = (el: ElementNode):string => {
  const props = el.props.map(({name, value}) => `${name}: "${value?.content}"`).join(', ')
  const children = el.children.map(it => genNode(it)).join(', ')

  return `h("${el.tag}",{${props}},[${children}])`
}

const genText = (text: TextNode): string => {
  return `\`${text.content}\``;
}
