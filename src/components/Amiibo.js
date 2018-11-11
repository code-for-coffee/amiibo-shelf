import React from "react";
// import PropTypes from "propTypes";

export const Amiibo = props => {
  console.log(props);
  return (
    <React.Fragment>
      {props.name}: {props.character} from {props.amiiboSeries}
    </React.Fragment>
  );
};

// Amiibo.propTypes = {
//   amiiboSeries: PropTypes.string,
//   character: PropTypes.string,
//   name: PropTypes.string
// };
