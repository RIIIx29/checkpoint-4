import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            I am <span className="grey">Erwan FILLAUD </span>
            from <span className="grey"> Nogent le Rotrou, France</span>
            <br />I am a junior Wed Developper
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> DIY
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing music
            </li>
            <li className="about-activity">
              <ImPointRight /> Enjoy life pleasures
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Potentiellement, ça peut le faire"{" "}
          </p>
          <footer className="blockquote-footer">Erwan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
