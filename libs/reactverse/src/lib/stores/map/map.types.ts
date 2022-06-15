import client from "../apollo";
import gql from "graphql-tag";
import * as scalar from "../scalar.type";
import { placementFragment, Placement } from "../asset/asset.types";

export type MapInput = {
  name: string;
  tileSize: number;
  tiles: scalar.TileInput[][];
  placements: Placement[];
  collisions: scalar.Interaction[];
  webviews: scalar.Interaction[];
};

export type Map = {
  id: string;
  name: string;
  tileSize: number;
  totalWidth: number;
  totalHeight: number;
  tiles: scalar.Tile[][];
  placements: Placement[];
  collisions: scalar.Interaction[];
  webviews: scalar.Interaction[];
  status: string;
};

export const mapFragment = gql`
  ${scalar.tileFragment}
  ${placementFragment}
  ${scalar.interactionFragment}
  fragment mapFragment on Map {
    id
    name
    tileSize
    tiles {
      ...tileFragment
    }
    placements {
      ...placementFragment
    }
    collisions {
      ...interactionFragment
    }
    webviews {
      ...interactionFragment
    }
    status
  }
`;
