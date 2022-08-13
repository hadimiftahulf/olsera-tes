import {TextField} from '@material-ui/core'
import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  align-items: ${(props) => (props.align ? props.align : 'start')};
  justify-content: ${(props) => (props.content ? props.content : 'start')};
`
export const TextFiledBox = styled(TextField)`
  padding: 5px 0px 10px 0px;
`
