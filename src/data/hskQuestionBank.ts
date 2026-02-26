import { Question } from '../types/hsk';
import { hsk1Questions } from './hsk1';
import { hsk2Questions } from './hsk2';
import { hsk3Questions } from './hsk3';
import { hsk4Questions } from './hsk4';
import { hsk5Questions } from './hsk5';
import { hsk6Questions } from './hsk6';
import { hsk7Questions } from './hsk7';
import { hsk8Questions } from './hsk8';
import { hsk9Questions } from './hsk9';

export const hskQuestionBank: Record<number, Question[]> = {
  1: hsk1Questions,
  2: hsk2Questions,
  3: hsk3Questions,
  4: hsk4Questions,
  5: hsk5Questions,
  6: hsk6Questions,
  7: hsk7Questions,
  8: hsk8Questions,
  9: hsk9Questions,
};
