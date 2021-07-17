import React, { useState } from "react";
import profile from "../images/profile.jpg";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Typography } from "@material-ui/core";

const Container = styled(animated.div)`
  display: inline-block;
  padding: 3em;
  background: #c7d2fe66;
  border-radius: 10px;
  z-index: 1;
  position: relative;
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  background-clip: border-box;
  cursor: pointer;
  width: 75%;
  /* margin: 20px; */
`;

const StyledImg = styled.img`
  width: 200px;
  height: auto;
  border: 2px solid black;
  border-radius: 50%;
`;

const StyledH1 = styled.h1`
  line-height: 1.5;
  letter-spacing: 1.15;
  font-family: "Gilroy";
`;

const StyledH3 = styled.h3`
  line-height: 1.5;
  letter-spacing: 1.15;
  font-family: "Gilroy";
  font-size: 20px;
`;

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Glasscard = ({user}) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 20, tension: 200, friction: 50 },
  }));

  const [Display, setDisplay] = useState(false);

  console.log(`User ${JSON.stringify(user)}`);
  return (
    <Container
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.interpolate(trans),
      }}
      onClick={() => setDisplay(!Display)}
    >
      <StyledImg alt="profile" src={user.picture.large} />
      <StyledH1>
        <Typography variant="subtitle1" style={{color:"white"}} gutterBottom>
          {`${user.name.title} ${user.name.first} ${user.name.last}`.toUpperCase()}
        </Typography>
      </StyledH1>
      <div style={{ display: Display ? "block" : "none" }}>
        <Typography variant="subtitle1">
          <StyledH3>{`${user.dob.age} ${user.gender}`}</StyledH3>
          <StyledH3>{user.email}</StyledH3>
          <StyledH3>{user.phone}</StyledH3>
          <StyledH3>{`# ${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} - ${user.location.postcode}`}</StyledH3>
        </Typography>
      </div>
    </Container>
  );
};

export default Glasscard;
