import { styled } from "uebersicht"

// import api_key and test_data
const config = require( "./src/config.json" )

export const get_current_date = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}
const curr_date = get_current_date();
const wotd_url = "https://api.wordnik.com/v4/words.json/wordOfTheDay?date="+curr_date+"&api_key="+config.api_key;


const Container = styled("div")`
    height: 200px;
    width: 500px;
    margin-left: 20px;
    p {
        color: white;
        text-align: justify;
        font-family: Bookman, sans-serif;
    }
    h1, h2 {
        color: white;
        text-align: left;
        font-family: Palatino, sans-serif;
    }

`
const Word = styled("h1")`

`

const Note = styled("p")`

`

const Defs = styled("div")`
    margin-left: 30px;
    text-align: justify;
    padding-bottom: 5px;
`

const Def = styled("p")`
    display: inline;
`

const PartOfSpeech = styled("h2")`
    text-size: 20px;
    display: inline;
`



export const initialState = { output: 'Fetching data' };

/*
export const command = (dispatch) =>
  fetch(wotd_url)
    .then((response) => {
        response.json().then((data)=>{
            //data = { } from wordnik api
            dispatch({ type: 'FETCH_SUCCEDED', output: data  });
        })
    })
    .catch((error) => {
      dispatch({ type: 'FETCH_FAILED', error: error });
    });
*/

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `${event.error}` };
  }
  const temp_wotd = event.output;
  return {
    output: temp_wotd
  };
}



export const refreshFrequency = false; // ms

export const render = ({ output, error }) => {
    return error ? (
        <Container>
            <div>Error: <strong>{output}</strong></div>
        </Container>
    ) : (
        <Container>
            <Word>{config.test_data.word}</Word>
            <Note>{config.test_data.note}</Note>
            {config.test_data.definitions.map((def, idx) => (

                renderDef(def, idx)
            ))}
        </Container>
    );
}
//  Each JSX element must have a unique key attribute
export const renderDef = (def, key) => {
    return (
        <Defs key={'wrapper'+key}>
            <PartOfSpeech key={'pos'+key}>{def.partOfSpeech}</PartOfSpeech>
            <Def key={'def'+key}> &bull; {def.text}</Def>
        </Defs>
    );
}
