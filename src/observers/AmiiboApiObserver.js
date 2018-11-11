import { Observable } from "rxjs/Rx";

const URI = "http://www.amiiboapi.com/api/";
const ROUTE = "amiibo/?character=";

const queryBuilder = query => `${URI}${ROUTE}${query}`;

export const AmmiiboApiObserver = character =>
  Observable.from(
    fetch(queryBuilder(character))
      .then(response => response.json())
      .catch(err => ({ error: err.toString() }))
  );
