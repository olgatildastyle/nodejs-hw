import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NotesTextIndex',
    default_language: 'english',
  },
);

export const Note = model('Note', noteSchema);
