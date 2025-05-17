'use client';

import { IconType } from 'react-icons';
import {
  BiCategoryAlt,
  BiCube,
  BiFile,
  BiFileBlank,
  BiFileFind,
  BiFolderOpen,
  BiMovie,
  BiMusic,
  BiPackage,
  BiPyramid,
  BiRocket,
  BiSave,
  BiAtom,
  BiBeenHere,
  BiBook,
  BiBox,
  BiBulb,
} from 'react-icons/bi';

export interface Option {
  Icon: IconType;
  text: string;
}

export const options: Option[] = [
  { Icon: BiCategoryAlt, text: 'Items' },
  { Icon: BiCube, text: 'Cubes' },
  { Icon: BiFile, text: 'Files' },
  { Icon: BiFileBlank, text: 'Notes' },
  { Icon: BiFileFind, text: 'Files' },
  { Icon: BiFolderOpen, text: 'Folders' },
  { Icon: BiMovie, text: 'Movies' },
  { Icon: BiMusic, text: 'Musics' },
  { Icon: BiPackage, text: 'Packages' },
  { Icon: BiPyramid, text: 'Pyramids' },
  { Icon: BiRocket, text: 'Rockets' },
  { Icon: BiSave, text: 'Files' },
  { Icon: BiAtom, text: 'Atoms' },
  { Icon: BiBeenHere, text: 'Your precise location in the world' },
  { Icon: BiBook, text: 'Books' },
  { Icon: BiBox, text: 'Files' },
  { Icon: BiBulb, text: 'Ideas' },
];
