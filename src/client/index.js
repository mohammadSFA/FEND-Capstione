import './styles/styles.scss'

// import 'materialize-css/dist/js/materialize.min'
// import 'materialize-css/js/datepicker'

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.datepicker');
//     var instances = M.Datepicker.init(elems, options);
//   });

import { appRunner, apiPostData } from "./js/app";
import { getDays } from "./js/date";
import { tripLog } from "./js/tripLog";
import { checkDate } from "./js/dateChecker";

export {
    getDays,
    tripLog,
    appRunner,
    apiPostData,
    checkDate
}