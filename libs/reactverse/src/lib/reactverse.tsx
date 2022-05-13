import { useWindowDimensions } from "./hooks";
import { Provider } from "react-redux";
import { store, client } from "./stores";
import { Loop, Screen, Socket, World } from "./containers";
import { ApolloProvider } from "@apollo/client";

// export interface ReactverseProps {
//   a: any;
// }

export const Reactverse = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div>
          <h1>Welcome to Reactverse!</h1>
        </div>
        <World />
        <Socket uri="localhost:3333">
          <Loop>loop</Loop>
        </Socket>
        <Screen />
      </ApolloProvider>
    </Provider>
  );
};
