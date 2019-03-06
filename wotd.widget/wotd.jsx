import { styled } from "uebersicht"

import config from './src/config.js'

const SUCCESS_TYPE = 'FETCH_SUCCEDED';
const FAILED_TYPE = 'FETCH_FAILED';

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
const wotd_url = "https://api.wordnik.com/v4/words.json/wordOfTheDay?date="+curr_date+"&api_key="+api_key;


const Container = styled("div")`

`

const Wotd = styled("div")(props => ({
    height: "40px",
    width: "40px",
    marginRight: "5px"
}))


export const initialState = { output: 'Fetching data' };


export const command = (dispatch) =>
  fetch(wotd_url)
    .then((response) => {
        response.json().then((data)=>{
            //data = { } from wordnik api
            dispatch({ output: data.word  });
        })

    })
    .catch((error) => {
      dispatch({ error: 'error' });
    });

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `${event.error}` };
  }
  const temp_wotd = event.output;
  return {
    output: temp_wotd,
  };
}


export const refreshFrequency = false; // ms

export const render = ({ output, error }) => {
    return error ? (
        <Container>
            <div>Error: <strong>{String(error)}</strong></div>
        </Container>
    ) : (
        <Container>
            <p>{output}</p>
        </Container>
    );
}
