import styled from 'styled-components';

export const SplashScreen = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f5;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

export default {
    SplashScreen,
};
