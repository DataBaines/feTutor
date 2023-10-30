import React, { useEffect } from "react";

const HelpContent = (props) => {
  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps
  const { dispatch } = props;

  //Run on didMount
  useEffect(() => {
    //console.log("Buttons OnMount event")
  }, []);

  useEffect(() => {
    //console.log("Buttons props change event")
  }, [props]);

  return (
    <div className="helpcontent">
      <h1>HelpContent!</h1>
      <p>Here we are going to add some help content to the page</p>
      <p>And some more</p>
    </div>
  );
};

export default HelpContent;
