import React, { useEffect } from "react";

const Instructions = (props) => {
  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps
  const { dispatch } = props;

  //Run on didMount
  useEffect(() => {
    console.log("Buttons OnMount event");
  }, []);

  useEffect(() => {
    console.log("Buttons props change event");
  }, [props]);

  return (
    <div>
      <h1>Introduction</h1>
      <p>Welcome to my Finite Element learning tool.</p>
      <p>
        It allows you to create a 2 dimensional mesh, divide it up into
        triangular elements, add your boundary conditions and see the partial
        differential equation solved.
      </p>
      <p>
        You can view the results in 3D, see the stiffness matrices, both at an
        element level and the global matrix, and see the iterations of the solve
        on each node.
      </p>
      <p>Start with the 'New Mesh Creation' below...</p>
    </div>
  );
};

export default Instructions;
