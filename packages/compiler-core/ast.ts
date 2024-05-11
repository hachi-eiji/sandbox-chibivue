export const enum NodeTypes {
  ELEMENT,
  TEXT,
  INTERPOLATION,
  ATTRIBUTE,
  DIRECTIVE,
}

export interface Node {
  type: NodeTypes
  loc: SourceLocation
}

export interface ElementNode extends Node {
  type: NodeTypes.ELEMENT
  tag: string; // 例 div
  props: Array<AttributeNode | DirectiveNode>
  children: TemplateChildNode[]
  isSelfClosing: boolean // 例 <img /> => true
}

export interface AttributeNode extends Node {
  type: NodeTypes.ATTRIBUTE
  name: string
  value: TextNode | undefined
}
export type TemplateChildNode = ElementNode | TextNode | InterpolationNode

export interface TextNode extends Node {
  type: NodeTypes.TEXT
  content: string
}

export interface InterpolationNode extends Node {
  type: NodeTypes.INTERPOLATION
  content: string
}

export interface DirectiveNode extends Node {
  type: NodeTypes.DIRECTIVE
  // v-on:click='increment'の場合は {name: 'on', arg: 'click', exp: 'incre'}
  name: string
  arg: string
  exp: string
}

export interface SourceLocation {
  start: Position
  end: Position
  source: string
}

export interface Position {
  offset: number // from start of file
  line: number
  column: number
}
