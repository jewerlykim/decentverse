import client from "../apollo";
import gql from "graphql-tag";
import * as scalar from "../scalar.type";

export type CharacterInput = {
  contract?: string;
  tokenId: string;
  left: scalar.Sprite;
  right?: scalar.Sprite;
  up?: scalar.Sprite;
  down?: scalar.Sprite;
};

export type Character = {
  id: string;
  contract?: string;
  tokenId: number;
  left: scalar.Sprite;
  right: scalar.Sprite;
  up?: scalar.Sprite;
  down?: scalar.Sprite;
  status: string;
};

export const characterFragment = gql`
  ${scalar.spriteFragment}
  fragment characterFragment on Character {
    id
    contract
    tokenId
    left {
      ...spriteFragment
    }
    right {
      ...spriteFragment
    }
    up {
      ...spriteFragment
    }
    down {
      ...spriteFragment
    }
    status
  }
`;
