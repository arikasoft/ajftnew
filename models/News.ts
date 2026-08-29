import mongoose, {
  Schema,
  type Model,
} from "mongoose";

export type NewsStatus =
  | "draft"
  | "published";

export interface INews {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  category: string;

  image: string;

  author: string;

  featured: boolean;

  important: boolean;

  status: NewsStatus;

  publishedAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

const NewsSchema =
  new Schema<INews>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
      },

      excerpt: {
        type: String,
        required: true,
        trim: true,
      },

      content: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        default: "General",
        trim: true,
      },

      image: {
        type: String,
        default: "",
        trim: true,
      },

      author: {
        type: String,
        default: "AJFT Team",
        trim: true,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      important: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "draft",
          "published",
        ],
        default: "draft",
        index: true,
      },

      publishedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      collection: "news",
    }
  );

NewsSchema.index({
  featured: -1,
  important: -1,
  publishedAt: -1,
  createdAt: -1,
});

const News: Model<INews> =
  mongoose.models.News ||
  mongoose.model<INews>(
    "News",
    NewsSchema
  );

export default News;