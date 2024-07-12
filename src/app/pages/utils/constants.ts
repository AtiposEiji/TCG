import {plainToInstance} from "class-transformer";
import {TcgListModel} from "../models/tcg-list.model";

export const tcgList = plainToInstance(TcgListModel, {
  tcgList: [
    {
      id: 0,
      name: "Magic: The Gathering",
      link: "magic"
    },
    {
      id: 1,
      name: "Pokemon",
      link: "pokemon"
    },
    {
      id: 2,
      name: "Yu-Gi-Oh",
      link: "yu-gi-oh"
    }
  ]
} as TcgListModel);
