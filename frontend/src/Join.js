import React, { useState } from "react";
import { Link } from "react-router-dom";
function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">join</h1>
          <div>
            {" "}
            <input
              placeholder=""
              type="text"
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </div>
          <div>
            {" "}
            <input
              placeholder=""
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            />{" "}
          </div>

          <Link  to={`/chat?name=${name}&room=${room}`}>
            <button className="button" type="submit">
             signin
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Join;
