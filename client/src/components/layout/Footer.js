import React from "react";

export default () => {
  return (
    <footer className="ui vertical footer segment center aligned">
      <h5 style={{ marginTop: "6.5px" }}>
        Copyright &copy; {new Date().getFullYear()} @ ConnectAfrica.com
        <span style={{ fontSize: "20px" }}>
          <i class="facebook icon" />
          <i class="twitter icon" />
          <i class="linkedin icon" />
          <i class="google plus icon" />
        </span>
      </h5>
    </footer>
  );
};
