import {TemplateChildNode, NodeTypes, ElementNode, TextNode, InterpolationNode, AttributeNode, DirectiveNode } from './ast'
import { toHandlerKey } from "../shared/general";

export const generate = ({
  children,
}:{children: TemplateChildNode[]}):string => {
  return `return function render(_ctx) {
    with(_ctx){
      const { h } = Chibivue;
      return ${genNode(children[0])};
    }
  }`
}

const genNode = (node: TemplateChildNode): string => {
  switch(node.type){
    case NodeTypes.ELEMENT:
      return genElement(node)
    case NodeTypes.TEXT:
      return genText(node)
    case NodeTypes.INTERPOLATION:
      return genInterpolation(node)
    default:
      return ''
  }
}

const genElement = (el: ElementNode):string => {
  const props = el.props.map(props => getProp(props)).join(', ')
  const children = el.children.map(it => genNode(it)).join(', ')

  return `h("${el.tag}",{${props}},[${children}])`
}

const genText = (text: TextNode): string => {
  return `\`${text.content}\``;
}

const genInterpolation = (node: InterpolationNode): string => {
  return `${node.content}`
}

const getProp = (prop: AttributeNode | DirectiveNode): string => {
  switch(prop.type) {
    case NodeTypes.ATTRIBUTE:
      return `${prop.name}: "${prop.value?.content}"`
    case NodeTypes.DIRECTIVE:
      switch(prop.name) {
        case 'on':
          return `${toHandlerKey(prop.arg)}: ${prop.exp}`
        default:
          throw new Error(`unexpected directive name. ${prop.name}`)
      }
    default:
      throw new Error(`unexpected props type`)
  }
}
