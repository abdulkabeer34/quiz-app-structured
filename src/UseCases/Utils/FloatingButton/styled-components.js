import styled from 'styled-components'



import { FloatButton } from 'antd';


export const StyledIcon = styled(FloatButton)`
  transition: all 0.2s linear;
  &:hover {
    transform: rotate(${(e) => (e.$animation ? 45 : 0)}deg);
  }
`;