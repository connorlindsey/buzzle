import styled from "styled-components"

interface ButtonProps {
  margin?: string
}

export default styled.button<ButtonProps>`
  height: 32px;
  padding: 0 14px;
  font-size: 14px;
  margin:${props => props.margin || `0 .05rem`};
  text-transform: uppercase;
  letter-spacing: 0.25;
  text-decoration: none;
  outline: none;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.primary["500"]};
  border: 2px solid ${props => props.theme.primary["500"]};
  text-align: center;

  transition: all 0.1s ease;

  &:hover {
    transform: none;
    background-color: ${props => props.theme.primary["400"]};
    border-color: ${props => props.theme.primary["400"]};
    color: #fff;
  }

  &:active {
    background-color: ${props => props.theme.primary["600"]};
    border-color: ${props => props.theme.primary["600"]};
    color: #fff;
  }
`

export const SecondaryButton = styled.button<ButtonProps>`
  height: 32px;
  padding: 0 14px;
  font-size: 14px;
  margin:${props => props.margin || `0 .05rem`};
  text-transform: uppercase;
  letter-spacing: 0.25;
  text-decoration: none;
  outline: none;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  background-color: transparent;
  color: ${props => props.theme.primary["500"]};
  border: 2px solid ${props => props.theme.primary["500"]};
  text-align: center;

  transition: all 0.15s linear;

  &:hover {
    transform: none;
    background-color: ${props => props.theme.primary["600"]};
    border-color: ${props => props.theme.primary["600"]};
    color: #fff;
  }

  &:active {
    background-color: ${props => props.theme.primary["600"]};
    border-color: ${props => props.theme.primary["600"]};
    color: #fff;
  }
`

export const TertiaryButton = styled.button<ButtonProps>`
  height: 32px;
  padding: 0 14px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.25;
  margin:${props => props.margin || `0 .05rem`};
  text-decoration: none;
  outline: none;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  background-color: transparent;
  color: ${props => props.theme.grey["500"]};
  border: 2px solid ${props => props.theme.grey["500"]};
  text-align: center;

  transition: all 0.15s linear;

  &:hover {
    transform: none;
    background-color: ${props => props.theme.grey["400"]};
    border-color: ${props => props.theme.grey["400"]};
    color: #fff;
  }

  &:active {
    background-color: ${props => props.theme.grey["600"]};
    border-color: ${props => props.theme.grey["600"]};
    color: #fff;
  }
`