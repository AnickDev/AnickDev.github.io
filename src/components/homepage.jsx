import minhaFoto from '../assets/portrait.jpg';


const Homepage = () => {
  return (
    <>
      <header>
        <div className="caixa-pessoal">
          <section>
            <h1>Júlio</h1>
            <h1>Anick</h1>

            <h2>
                Frase de impacto aqui
            </h2>

            <p>Um resumo sobre mim nesse parágrafo</p>
          </section>

          <section>
            <img src={minhaFoto} alt="" />
            <span>ESTUDANTE • SESI • SENAI</span>
          </section>
        </div>
      </header>

      <main>
        <div className="textos-centrais">
            <section className="texto 1">
                <p>Erros que me Ensinaram</p>
                <p>Pontes entre Disciplinas</p>
                <p>Escola para a Vida</p>
                <p>Teorias que Estudei</p>
                <p>Debates em Sala</p>
                <p>Conceitos na Prática</p>
                <p>Projetos que Construí</p>
            </section>
            <section className="texto 2">

            </section>
        </div>
      </main>
    </>
  );
};

export default Homepage;
