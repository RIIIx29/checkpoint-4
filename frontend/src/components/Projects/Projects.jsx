import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Hooky from "../../Assets/Hooky.jpeg";
import Fourriere from "../../Assets/Fourriere.jpg";
import P3 from "../../Assets/CPTS.png";
import P1 from "../../Assets/P1.jpeg";
import Agence from "../../Assets/NERF.jpg";
import P2 from "../../Assets/Catfight.jpeg";
import Meuble from "../../Assets/Meuble.jpg";
import Apside from "../../Assets/Apside.png";
import WWW from "../../Assets/WWW.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={P1}
              isBlog={false}
              title="La Wild à la Loupe"
              description="Premier projet, projet fictif sur le Campus de la Wild de La Loupe, codé en dur HTML/CSS"
              ghLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={P2}
              isBlog={false}
              title="Cat Fight"
              description="Deuxième projet fictif, j'aime les chats, j'adore les bastons de chats, c'est toujours très stylé."
              ghLink="https://github.com/RIIIx29/2022-03-js-laloupe-miew-miew-team-p2"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={WWW}
              isBlog={false}
              title="Wild Worst Waster"
              description="L'écologie c'est vite chiant et puis j'aime pas Gretta, on a fait un truc tout pété mais on s'est bien marré"
              ghLink="https://github.com/RIIIx29/WildWorstWaster"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Apside}
              isBlog={false}
              title="Apside"
              description="Hackakon de merde"
              ghLink="https://github.com/RIIIx29/Hackathon2"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={P3}
              isBlog={false}
              title="CPTS NOEL"
              description="Projet Client, La CPTS NO HELL est une regroupant des professionnels de santé afin d'améliorer la prise en charge et le parcours de soin des patients"
              ghLink="https://github.com/WildCodeSchool/2022-03-js-laloupe-cpts-noel-p3"
            />
          </Col>
        </Row>
      </Container>
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Future <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>Live in present but think the future</p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Agence}
              isBlog={false}
              title="L'Agence qui n'a pas encore de nom "
              description="On ne sait pas jusqu'où ça ira, mais on y va, vers l'infini et au delà, Objectif 200K !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Fourriere}
              isBlog={false}
              title="Fourrière Départementale eurélienne"
              description="parce que j'adore les animaux et que la cause est noble, Adoptez les tous."
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Hooky}
              isBlog={false}
              title="Akira's Music Gears"
              description="Projet perso lié à mon amour pour les pédales d'effets, les amplis et les guitares, site marchand"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Meuble}
              isBlog={false}
              title="Hooky Wood's"
              description="Comme Charles Ingals, j'aime le bois mais je préfère lui donner une seconde jeunesse que le couper, Quoique, couper du bois ça détend"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
