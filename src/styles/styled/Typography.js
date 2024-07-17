import styled from 'styled-components';

export const Title = styled.h1`
  font-family: ${props => props.theme.fontFamily.title};
  /* 可以添加其他樣式，如字體大小、顏色等 */
`;

export const Content = styled.p`
  font-family: ${props => props.theme.fontFamily.content};
  /* 可以添加其他樣式 */
`;

// 您可以在這裡添加更多文字相關的樣式組件
export const Subtitle = styled.h2`
  font-family: ${props => props.theme.fontFamily.title};
  /* 其他樣式 */
`;

export const SmallText = styled.span`
  font-family: ${props => props.theme.fontFamily.content};
  font-size: 0.8em;
  /* 其他樣式 */
`;