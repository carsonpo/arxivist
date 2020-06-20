import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  justify-items: center;

  body: {
    margin: 0;
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  width: 100vw;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;

  cursor: pointer;
`;

export const NavItem = styled.li`
  margin: 10px 15px;

  & :hover {
    background-color: #333;
  }
`;

export const NavAnchor = styled.a`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
`;
